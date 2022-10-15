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

// Initialize results with current nodes.
// For stackoverflow, these always seem present on load,
// but we may need to test for edge conditions and use an observer
// or some other method to respond to new textareas
var preexistingTextareas = document.querySelectorAll("textarea");

function applyDomModifications(storage: StorageModal) {

    // tell the background runner that we're active, so it can change the badge text
    sendTypedMessage({type: "set_active", text: storage.functionalityDisabled ? "off" : "on"})

    preexistingTextareas.forEach(textArea => {

        if(storage.functionalityDisabled) {
            removeIndentationEnrichment(textArea)
            textArea.classList.remove("stack-exchange-indendation-plus-plus-bordered")
        } else {
            // not disabled, so we apply all our modification based on other settings

            if(storage.textAreaBorderEnabled ?? true) {
                textArea.classList.add("stack-exchange-indendation-plus-plus-bordered")
            } else {
                textArea.classList.remove("stack-exchange-indendation-plus-plus-bordered")
            }
            
            enrichWithIndentation(textArea)
        }

    })
    
}

let storageState: StorageModal | undefined = undefined

// potential race condition with onChanged, consider using await
storage.sync.get().then(state => {
    storageState = state
    applyDomModifications(storageState)
});

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

