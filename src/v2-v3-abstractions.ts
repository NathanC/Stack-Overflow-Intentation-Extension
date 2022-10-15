
/**
 * webextension-polyfill doesn't work for manifest v3, so we proxy to the underlying "browser" or "chrome" objects
 * 
 * chrome.storage seems like a superset of browser storage, though it's definitely possible they have different semantics
 */
export const compatibleStorage: typeof browser.storage = (typeof browser === "undefined") ? chrome.storage : browser.storage
