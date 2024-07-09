import { useRef } from "react"

import ButtonIcon from "../ButtonSVG"

function PromptModal({ isOpen, setModalOpen, children }) {
  const modalRef = useRef(null)
  const closeModal = () => {
    const isModalOpen = !isOpen
    setModalOpen(isModalOpen)
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 bg-[#0D0D1233] bg-opacity-50 flex items-center justify-center`}
      onClick={closeModal}>
      <div
        ref={modalRef}
        className="bg-[#F9FAFB] rounded-sm shadow-lg p-[8px] space-y-2 w-[400px]"
        onClick={(e) => e.stopPropagation()}>
        <div>{children}</div>
        <input
          placeholder="Your Prompt"
          className="rounded-sm focus:outline-none p-1 text-md w-full bg-white border text-[#666D80]"
        />
        <div className="flex justify-end">
          <button className=" text-white bg-[#3B82F6] jusify-end rounded-sm text-md flex space-x-1 px-4 py-2 items-center">
            <ButtonIcon />
            <span>Generate</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromptModal
