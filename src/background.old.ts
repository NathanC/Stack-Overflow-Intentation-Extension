// @ts-nocheck

/**
 * This was my first attempt at a background service,
 * but I'm replacing my complicated state syncing logic
 * with simpler listeners on storage
 * 
 * I decided to leave this in the repo though, because
 * I had a lot of fun using the "on-change" proxy
 * and experimenting with TypeScript readonly values
 */

import onChange from 'on-change';
import { browserAction, Runtime, runtime } from "webextension-polyfill";
import RuntimeMessage, { sendTypedMessage } from "./RuntimeMessage";

const activeTabIcon = {
    "16": require("../icons/active-tab-icon.svg"),
    "32": require("../icons/active-tab-icon.svg")
}

interface BackgroundState {
    readonly stateVersion: number
    popupOpenCount: number
    secondsSinceStart: number
}

type Mutable<T> = {
    -readonly [k in keyof T]: T[k];
};

let popupCurrentlyListening = false

const backgroundState = onChange<BackgroundState>(

    { // inital state
        stateVersion: 1,
        popupOpenCount: 0,
        secondsSinceStart: 0
    },
    // callback whenever backgroundState is mutated
    function (this, path, value, previousValue, applyData) {
    
        const underlyingState = onChange.target(this);

         // mutate the underlying object to increase the version
        (underlyingState as Mutable<BackgroundState>).stateVersion++

        if(popupCurrentlyListening) {
            // only send the message if someone cares about it, otherwise
            // we get annoying errors that there's no listener
            sendTypedMessage({type: "background_state_updated", state: underlyingState })
        }
    }
);

setInterval(() => {
    backgroundState.secondsSinceStart++
}, 1000)

function handleMessage(message: RuntimeMessage, sender: Runtime.MessageSender) {

    if(message.type === "popup_opened") {

        // prepare for future state broadcasts
        popupCurrentlyListening = true

        const underlyingState = onChange.target(backgroundState)

        // increase it in a way that doesn't result in a state broadcast
        underlyingState.popupOpenCount++

        // give the popup the current (non-proxied) state
        return Promise.resolve(underlyingState)
        
    } else if(message.type === "popup_closed") {
        popupCurrentlyListening = false
    } else if(message.type === "set_active") {

        browserAction.setIcon({path: activeTabIcon, tabId: sender.tab?.id})
    
    }
}

runtime.onMessage.addListener(handleMessage)
