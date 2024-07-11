import { useRef, useState } from "react"

import { useFocusMonitor } from "~hooks/useFocusMonitor"

import Icon from "../IconSVG"

function IconButton({ setModalOpen }) {
  //const isMessagePanelActive = useFocusMonitor(formRef);
  const { isMessagePanelActive, setMessagePanelActive } = useFocusMonitor()
  const handleClick = () => {
    const activeElement = document.activeElement
    setModalOpen(true)
    console.log("button clicked")
    setTimeout(() => {
      if (activeElement) {
        // @ts-ignore
        activeElement.focus()
      }
    }, 0)
    setMessagePanelActive(false)
  }
  return (
    isMessagePanelActive && (
      <span className={` max-w-md rounded-lg mx-auto bg-white`}>
        <span
          className={` rounded-lg p-4 fixed hover:scale-105 bg-white left-0 bottom-0 overflow-hidden`}>
          {
            <button
              type="button"
              onClick={handleClick}
              className="icon-button  rounded-full transition-all border-none
          shadow-lg hover:shadow-md
          active:scale-105 bg-slate-50 hover:bg-slate-100 hover:text-slate-900">
              <Icon />
            </button>
          }
        </span>
      </span>
    )
  )
}

export default IconButton
