
type RuntimeMessage = {
    type: "set_active",
    text: "on" | "off"
}

// use browser if it exists (indicating we're running in manifest v2 in firefox), otherwise use chrome (for v3)
export const sendTypedMessage = (message: RuntimeMessage) => 
    (typeof browser === "undefined")
        ? chrome.runtime.sendMessage(message)
        : browser.runtime.sendMessage(message)
        
export default RuntimeMessage