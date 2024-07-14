import { useCallback, useEffect, useState } from "react"

export const useFocusMonitor = () => {
  const [isMessagePanelActive, setMessagePanelActive] = useState(false)
  const [activeInputElement, setActiveInputElement] = useState()
  const handleFocus = useCallback((element) => {
    setMessagePanelActive(true)
    setActiveInputElement(element)
  }, [])
  const handleBlur = useCallback((event) => {
    const relatedTarget = event.relatedTarget as HTMLElement | null
    if (relatedTarget && relatedTarget.classList.contains("plasmo-csui-container")) {
      return
    }
    setMessagePanelActive(false)
  }, [])

  useEffect(() => console.log(isMessagePanelActive), [isMessagePanelActive])

  useEffect(() => {
    const addListeners = (element: HTMLElement) => {
      element.addEventListener("focus", handleFocus)
      element.addEventListener("blur", handleBlur)
    }

    const removeListeners = (element: HTMLElement) => {
      element.removeEventListener("focus", handleFocus)
      element.removeEventListener("blur", handleBlur)
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          const chatWindows = document.querySelectorAll(
            ".msg-form__msg-content-container"
          )
          chatWindows.forEach((chatWindow) => {
            const messageInput = chatWindow.querySelector(
              ".msg-form__contenteditable"
            ) as HTMLElement
            if (messageInput) {
              addListeners(messageInput)
            }
          })
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
    // console.log('state:', isMessagePanelActive);

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect()
      document
        .querySelectorAll(".msg-overlay-conversation-bubble")
        .forEach((element) => {
          removeListeners(element as HTMLElement)
        })
    }
  }, [handleFocus, handleBlur])

  return {
    isMessagePanelActive,
    setMessagePanelActive,
    activeInputElement
  }
}
