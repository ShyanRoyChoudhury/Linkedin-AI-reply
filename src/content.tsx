import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useRef, useState } from "react"

import ButtonIcon from "~ButtonSVG"
import { CountButton } from "~features/CountButton"
import IconButton from "~features/IconButton"
import PromptModal from "~features/PromptModal"
import { useChatFocus } from "~hooks/useChatFocus"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const isMessagePanelActive = useChatFocus()
  // if(!isMessagePanelActive) return ();

  return (
    <div>
      <div
        className="z-50 flex fixed bottom-0 "
        onClick={() => {
          console.log("clicked")
          setModalOpen(true)
        }}>
        <IconButton />
      </div>
      <div className="z-50 flex fixed top-0 right-8">
        <CountButton />
      </div>
      <div className="z-50 flex justify-center h-screen w-screen items-center">
        <PromptModal isOpen={isModalOpen} setModalOpen={setModalOpen}>
          messages
        </PromptModal>
      </div>
    </div>
  )
}

export default PlasmoOverlay
