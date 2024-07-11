import React, { useEffect, useRef, useState } from "react"

import { useFocusMonitor } from "~hooks/useFocusMonitor"
import InsertIcon from "~InsertSVG"

import ButtonIcon from "../ButtonSVG"

function PromptModal({ isOpen, setModalOpen }) {
  // const prompts = []
  const [userPrompt, setUserPrompt] = useState("")
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [prompt, setPrompt] = useState<string>("")
  const { activeInputElement } = useFocusMonitor() as any

  const closeModal = () => {
    const isModalOpen = !isOpen
    setModalOpen(isModalOpen)
  }

  useEffect(() => {}, [activeInputElement])
  const handleGenerate = () => {
    // setPromptsList((prevPrompts) => [...prevPrompts, prompt])
    const response =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    setGeneratedResponse(response)
    setUserPrompt(prompt)
    setPrompt("")
  }

  const handleInsert = () => {
    // const activeElement = document.activeElement
    if (
      activeInputElement.target &&
      activeInputElement.target.classList.contains("msg-form__contenteditable")
    ) {
      const contentEditableDiv = activeInputElement.target

      // Set the value of the contenteditable div
      const valueToSet = generatedResponse // Replace with your value

      // Clear existing content, including placeholder
      contentEditableDiv.innerHTML = ""

      // Insert the generated response as a paragraph (similar to the original placeholder structure)
      const p = document.createElement("p")
      p.textContent = valueToSet
      contentEditableDiv.appendChild(p)

      // Dispatch input and change events to ensure any listeners are triggered
      const inputEvent = new Event("input", { bubbles: true })
      const changeEvent = new Event("change", { bubbles: true })

      contentEditableDiv.dispatchEvent(inputEvent)
      contentEditableDiv.dispatchEvent(changeEvent)

      // Optionally focus the contenteditable div to simulate user interaction
      contentEditableDiv.focus()

      // Simulate Enter key press to send the message (if required by the platform)
      const enterEvent = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13
      })
      setGeneratedResponse("")
    }
  }
  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 bg-[#0D0D1233] bg-opacity-50 flex items-center justify-center`}
      onClick={closeModal}>
      <div
        className="bg-[#F9FAFB] rounded-lg shadow-lg p-[8px]  w-[400px] space-y-2"
        onClick={(e) => e.stopPropagation()}>
        <div>
          {generatedResponse && (
            <div className="flex flex-col space-y-2">
              <div className="bg-[#DFE1E7] p-2 rounded text-md self-end max-w-md">
                {userPrompt}
              </div>

              <div className="bg-[#DBEAFE] p-2 rounded text-md text-[#333] self-start max-w-md">
                {generatedResponse}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <input
            placeholder="Your Prompt"
            type="text"
            value={prompt}
            className="rounded-md focus:outline-none p-1 text-md w-full bg-white border text-[#666D80]"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex justify-end">
            {generatedResponse !== "" ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleInsert}
                  className="border border-[#666D80] text-[#666D80] rounded-md text-md flex space-x-1 px-4 py-2 items-center font-medium">
                  <InsertIcon />
                  <span>Insert</span>
                </button>
                <button
                  type="submit"
                  className=" text-white bg-[#3B82F6]  active:scale-105 hover:bg-[#76a6f2]  transition-all rounded-md text-md flex space-x-1 px-4 py-2 items-center font-medium">
                  <ButtonIcon />
                  <span>Regenerate</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (prompt !== "") handleGenerate()
                }}
                className=" text-white bg-[#3B82F6]  active:scale-105 hover:bg-[#76a6f2]  transition-all rounded-md text-md flex space-x-1 px-4 py-2 items-center font-medium">
                <ButtonIcon />
                <span>Generate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptModal
