import { Storage } from "@plasmohq/storage"

const storage = new Storage()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SET_MODAL_STATE") {
    storage.set("modalState", message.isOpen)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "MODAL_STATE_CHANGED",
        isOpen: message.isOpen
      })
    })
  }
  if (message.type === "GET_MODAL_STATE") {
    storage.get("modalState").then((isOpen) => {
      sendResponse({ isOpen })
    })
    return true // Indicates that the response is sent asynchronously
  }
})
