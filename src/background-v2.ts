import RuntimeMessage from "./RuntimeMessage";

function handleMessage(message: RuntimeMessage, sender: browser.runtime.MessageSender) {

    // no need for this check now, but no harm having it in case we add other types later
    if(message.type === "set_active") {

        const color =     message.text === "off" ? "#ff0000" : "#1a5276"
        const textColor = message.text === "off" ? "#000" : "#fff"

        browser.browserAction.setBadgeTextColor({color: textColor, tabId: sender.tab?.id})
        browser.browserAction.setBadgeBackgroundColor({color: color, tabId: sender.tab?.id})
        browser.browserAction.setBadgeText({text: message.text, tabId: sender.tab?.id})    
    }
}

browser.runtime.onMessage.addListener(handleMessage)
