import { useRef } from "react"

import ButtonIcon from "../ButtonSVG"
import IconButton from "./IconButton"

function MessageModal({ isMessagePanelActive, setModalOpen }) {
  if (!isMessagePanelActive) return null

  return (
    <div className={`z-50 flex fixed bottom-0`}>
      <div
        className="bg-[#F9FAFB] rounded-sm shadow-lg p-[8px] space-y-2 w-[400px]"
        onClick={(e) => {
          e.stopPropagation()
          setModalOpen(true)
        }}>
        <IconButton />
      </div>
    </div>
  )
}

export default MessageModal
