import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"

import IconButton from "~features/IconButton"
import PromptModal from "~features/PromptModal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <div>
      <div className="z-50 flex justify-center h-screen w-screen items-center">
        <PromptModal isOpen={isModalOpen} setModalOpen={setModalOpen} />
      </div>
      <IconButton setModalOpen={setModalOpen} />
    </div>
  )
}

export default PlasmoOverlay
