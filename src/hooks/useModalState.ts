import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const useModalState = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const updateModalState = async () => {
      try{
        setModalOpen((await storage.get("modalState")) || false)
      } catch (e){
        console.log('failed to get modal state from storage', e)
      }
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
    try{

      setModalOpen(newState)
      chrome.runtime.sendMessage({ type: "SET_MODAL_STATE", isOpen: newState })
    } catch (e) {
      console.log('failed to set modal state in storage', e)
    }
  }

  return [isModalOpen, updateModalState] as const
}
