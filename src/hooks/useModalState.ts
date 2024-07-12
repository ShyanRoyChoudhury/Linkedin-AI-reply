import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

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
