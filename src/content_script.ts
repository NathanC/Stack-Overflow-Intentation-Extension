console.log("very start of content script")

import { sendTypedMessage } from "./RuntimeMessage";
import StorageModal from "./StorageModal";
import textareaDev from "./textareaDev";

import { compatibleStorage as storage } from "./v2-v3-abstractions";

const currentlyEnriched: WeakMap<HTMLTextAreaElement, (this: HTMLTextAreaElement, e: KeyboardEvent) => void> = new WeakMap()

function enrichWithIndentation(textArea: HTMLTextAreaElement) {

    // remove any past enrichment
    removeIndentationEnrichment(textArea)

    const listener = textareaDev(storageState?.numberOfSpacesPerTab || 4)
    currentlyEnriched.set(textArea, listener)

    textArea.addEventListener("keydown", listener, true)
}

function removeIndentationEnrichment(textArea: HTMLTextAreaElement) {
    
    const prexistingListener = currentlyEnriched.get(textArea)

    if(prexistingListener !== undefined) {
        textArea.removeEventListener("keydown", prexistingListener, true)
        currentlyEnriched.delete(textArea)
    }
}

function nodeIsElement(node: Node): node is Element {
    return node.nodeType === Node.ELEMENT_NODE
}

/**
 * Restore the initial attributes to a TextArea after we remove the overlay
 */
function restoreInitialAttributes(textArea: HTMLTextAreaElement) {

    const initialAttributes = textAreas.get(textArea)

    if(!initialAttributes) {
        console.warn("Tried to remove initial attributes from text area, but textarea not found in map")
        return
    }

    if(initialAttributes["aria-description"] === null) {
        textArea.removeAttribute("aria-description")
    } else {
        textArea.setAttribute("aria-description", initialAttributes["aria-description"])
    }

    if(initialAttributes.spellcheck === null) {
        textArea.removeAttribute("spellcheck")
    } else {
        textArea.setAttribute("spellcheck", initialAttributes.spellcheck)
    }
}

/**
 * Capture the initial (relevant) attrbiutes from a text area before we apply the overlay
 */
function getInitialAttributes(textArea: HTMLTextAreaElement): InitalTextAreaAttributes {
    
    const existingAriaDescription = textArea.getAttribute("aria-description")
    const existingSpellcheck = textArea.getAttribute("spellcheck")

    return {"aria-description": existingAriaDescription, spellcheck: existingSpellcheck}
}

interface InitalTextAreaAttributes {
    "aria-description": string | null
    spellcheck: string | null
}

const textAreas: Map<HTMLTextAreaElement, InitalTextAreaAttributes> = new Map()

// Initialize all the text areas we see after load
document.querySelectorAll("textarea").forEach(preexistingTextArea => {
    textAreas.set(preexistingTextArea, getInitialAttributes(preexistingTextArea))
})

function removeOverlay(textArea: HTMLTextAreaElement, removePermenantly: boolean) {

    textArea.removeEventListener("click", handleOverlayClick)
    textArea.removeEventListener("keydown", handleOverlayKeyDown)

    if(removePermenantly) {
        
        const stateUpdate: Partial<StorageModal> = {
            welcomeMessageDismissed: true
        }

        storage.sync.set(stateUpdate)
    }

    textArea.classList.remove("stack-overflow-indentation-plus-plus-welcome-overlay")
    restoreInitialAttributes(textArea)
}

function handleOverlayKeyDown(this: HTMLTextAreaElement, event: KeyboardEvent) {
    removeOverlay(this, true)
    this.removeEventListener("click", handleOverlayClick)
}

function handleOverlayClick(this: HTMLTextAreaElement, event: MouseEvent) {
    removeOverlay(this, true)
    this.removeEventListener("keydown", handleOverlayKeyDown)
}

var domObserver = new MutationObserver(function (mutations) {

    mutations.forEach( mutation => {

        const node = mutation.target

        if(nodeIsElement(node)) {
            const newTextElements = Array.from(node.querySelectorAll("textarea"));

            newTextElements.forEach(newTextArea => {

                // blacklist comments, for now. We may want to whitelist other stuff instead, later
                const isComment =
                    newTextArea.name === "comment"
                    || newTextArea.placeholder === "Use comments to ask for clarification or add more information. Avoid answering questions in comments."
                    || newTextArea.closest("comment-form")

                if(!isComment) {
                    textAreas.set(newTextArea, getInitialAttributes(newTextArea))
                }

            })

            if(newTextElements.length > 0) {
                applyDomModifications(storageState)
            }
        }
    });
});

function applyDomModifications(existingState: StorageModal) {

    // tell the background runner that we're active, so it can change the badge text
    sendTypedMessage({type: "set_active", text: existingState.functionalityDisabled ? "off" : "on"})

    textAreas.forEach((initialAttributes, textArea) => {


        if(existingState.functionalityDisabled) {
            removeIndentationEnrichment(textArea)
            removeOverlay(textArea, false)
            textArea.classList.remove("stack-exchange-indendation-plus-plus-bordered")
        } else {

            // not disabled, so we apply all our modification based on other settings

            if(existingState.welcomeMessageDismissed) {
                removeOverlay(textArea, false)
            } else { // first time after install

                textArea.classList.add("stack-overflow-indentation-plus-plus-welcome-overlay")
                
                // store various settings, spellcheck and aria 
                textArea.spellcheck = false

                // Might not be needed, as the background would likely be ignored by screen readers
                // TODO: find if this is a useful accessibility setting, or useless/detrimental
                textArea.setAttribute("aria-description", "Textarea with an overlay welcome message from the Stack Overflow ++ extension." + 
                " Any keyboard or mouse interaction will permanently dismiss this overlay. Overlay contains an image with text that" +
                " welcomes you to the extension, instructs you that tabbing will indent one or more lines and shift-tabbing will de-indent," +
                " and notes that you can use the extension's toolbar action to change various settings (such as the number" +
                " of spaces per tab). Interact to dismiss, and I hope you enjoy the extension!")


                // each listener will fire once, and when fired will remove the other listner that wasn't fired
                textArea.addEventListener("click", handleOverlayClick, {once: true})
                textArea.addEventListener("keydown", handleOverlayKeyDown, {once: true})
            }

            if(existingState.textAreaBorderEnabled ?? true) {
                textArea.classList.add("stack-exchange-indendation-plus-plus-bordered")
            } else {
                textArea.classList.remove("stack-exchange-indendation-plus-plus-bordered")
            }
            
            enrichWithIndentation(textArea)
        }

    })
    
}

/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 */
function addStyle(styleString: string) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}

// it seems like for manifest 3, the bundler automatically gets the url on `require`, but only gives the file path for manifest 2. Strange.
const compatibleGetURL = (pathOrUrl: string) => typeof browser === "undefined" ? pathOrUrl : browser.runtime.getURL(pathOrUrl)

const textAreaOverlayUrl = compatibleGetURL(require("../images/textAreaOverlay.png"))
const textAreaOverlayHoverUrl = compatibleGetURL(require("../images/textAreaOverlayHovered.png"))

// we need to get the image url from the runtime, so we can't define this in our css file
// instead, we just inject it into the head
// we add both images in the background-image, but the later will be hidden by the gradient
// however, this enforces it gets loaded, so that when we hover later this is no delay
addStyle(`
  textarea.stack-overflow-indentation-plus-plus-welcome-overlay, textarea.stack-overflow-indentation-plus-plus-welcome-overlay:focus {
    background-image: url(${textAreaOverlayUrl}), linear-gradient(to right, #a8c0ff, #3f2b96), url(${textAreaOverlayHoverUrl});
    color: transparent;
    background-repeat:no-repeat;
    background-position: center center;
    cursor: pointer;
  }
  
  textarea.stack-overflow-indentation-plus-plus-welcome-overlay:hover {
    background-image: url(${textAreaOverlayHoverUrl}), linear-gradient(to right, #a8c0ff, #3f2b96);
  } 
`)

// TODO: centralize defaults for here and popup
let storageState: StorageModal = {}

/**
 * Get inital state
 * 
 * apply all modificiations to the dom (hook into textareas for indentation, add border, potentially add overlay, or remove any of these)
 * 
 * listen to any changes of sync storage
 *    * and reapply dom modifications
 * 
 * observe new text areas added
 *    * and reapply dom modifications
 */
console.log("about to setup..")
async function setup() {

    const initialStorageState = await storage.sync.get()
    storageState = initialStorageState

    console.log("setting up.. ", initialStorageState)

    applyDomModifications(storageState)

    storage.onChanged.addListener((changes, area) => {

        if(area !== "sync") {
            // we only care about sync state. storage.sync.onChanged doesn't exist for the "browser" object
            return
        }
    
        const allChanges: Partial<StorageModal> = {}
    
        for (const [property, change] of Object.entries(changes)) {
            allChanges[property as keyof StorageModal] = (change as any).newValue
        }
    
        storageState = ({...storageState, ...allChanges})
        applyDomModifications(storageState)
    })

    // observe the document document body for changes. We could probably observe a smaller portion of the page,
    // but this will catch all changes and Stack Overflow isn't a highly dynamic page so the cost is cheap
    domObserver.observe(document.body, {childList: true, subtree: true});
}

setup()