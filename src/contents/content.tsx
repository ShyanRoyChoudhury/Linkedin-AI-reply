// // export default PlasmoOverlay

import type { PlasmoGetOverlayAnchor } from "plasmo"
import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

// import PromptModal from "~features/PromptModal"

// // import cssText from "data-text:~style.css"
// // import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
// // import { useState } from "react"

// // import IconButton from "~features/IconButton"
// // import PromptModal from "~features/PromptModal"

// // export const config: PlasmoCSConfig = {
// //   matches: ["https://*.linkedin.com/*"]
// // }

// // export const getStyle = () => {
// //   const style = document.createElement("style")
// //   style.textContent = cssText
// //   return style
// // }

// // // export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
// // //   document.querySelector('[aria-label="Messaging"]')

// // const PlasmoOverlay = () => {
// //   const [isModalOpen, setModalOpen] = useState(false)
// //   return (
// //     <div>
// //       <div className="z-50 ">
// //         <PromptModal isOpen={isModalOpen} setModalOpen={setModalOpen} />
// //       </div>
// //       <IconButton setModalOpen={setModalOpen} />
// //     </div>
// //   )
// // }

import { Storage } from "@plasmohq/storage"

import IconButton from "~features/IconButton"

const storage = new Storage()

export const useModalState = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const updateModalState = async () => {
      setModalOpen((await storage.get("modalState")) || false)
    }

    const messageListener = (message) => {
      if (message.type === "MODAL_STATE_CHANGED") {
        setModalOpen(message.isOpen)
      }
    }

    chrome.runtime.onMessage.addListener(messageListener)
    updateModalState()
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener)
    }
  }, [])
  const updateModalState = (newState: boolean) => {
    setModalOpen(newState)
    chrome.runtime.sendMessage({ type: "SET_MODAL_STATE", isOpen: newState })
  }

  return [isModalOpen, updateModalState] as const
}

export const getRootContainer = (): Promise<Element> =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainer = document.querySelector(
        '[aria-label="Write a message…"]'
      )
      if (rootContainer && rootContainer.children[0]) {
        clearInterval(checkInterval)
        resolve(rootContainer.children[0])
      }
    })
  })

const App = () => {
  return <IconButton />
}

// // export const render = async ({ createRootContainer }) => {
// //   const rootContainer = await createRootContainer()
// //   const root = createRoot(rootContainer)
// //   root.render(<App />)
// // }

// // Store the root instance
let rootInstance = null

export const render = async ({ createRootContainer }) => {
  const rootContainer = await createRootContainer()

  // Check if root instance already exists
  if (!rootInstance) {
    rootInstance = createRoot(rootContainer)
  }

  rootInstance.render(<App />)
}
