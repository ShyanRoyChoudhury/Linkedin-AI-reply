import { useRef } from "react"

import { useFocusMonitor } from "~hooks/useFocusMonitor"

import Icon from "../IconSVG"

function IconButton({ setModalOpen }) {
  const formRef = useRef(null)
  //const isActive = useFocusMonitor(formRef);
  const isActive = useFocusMonitor()
  const handleClick = () => {
    const activeElement = document.activeElement
    setModalOpen(true)
    setTimeout(() => {
      if (activeElement) {
        // @ts-ignore
        activeElement.focus()
      }
    }, 0)
  }
  return (
    <div
      className="max-w-md rounded-lg mx-auto"
      ref={formRef}
      onClick={handleClick}>
      <div
        className={`border rounded-lg p-4 fixed hover:scale-105 left-0 bottom-0 overflow-hidden ${isActive ? "border-blue-500 bg-white" : ""}`}>
        <button
          type="button"
          className="rounded-full transition-all border-none
          shadow-lg hover:shadow-md
          active:scale-105 bg-slate-50 hover:bg-slate-100 hover:text-slate-900">
          <Icon />
        </button>
      </div>
    </div>
  )
}

export default IconButton
