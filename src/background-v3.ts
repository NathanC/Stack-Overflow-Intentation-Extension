/**
 * This is to support manifest v3, which requires
 * service workers instead of background scripts.
 * 
 * Since this is only for v3, we'll directly use the "chrome" object here.
 */


import RuntimeMessage from "./RuntimeMessage";

function handleMessage(message: RuntimeMessage, sender: chrome.runtime.MessageSender) {

    // no need for this check now, but no harm having it in case we add other types later
    if(message.type === "set_active") {

        const color =     message.text === "off" ? "#ff0000" : "#1a5276"
        // const textColor = message.text === "off" ? "#000" : "#fff"

        // chrome automatically sets the text color based on the backround color
        chrome.action.setBadgeBackgroundColor({color: color, tabId: sender.tab?.id})
        chrome.action.setBadgeText({text: message.text, tabId: sender.tab?.id})  
    }
}

chrome.runtime.onMessage.addListener(handleMessage)

 