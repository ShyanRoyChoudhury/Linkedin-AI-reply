import React, { useEffect, useState } from "react"

import { useFocusMonitor } from "~hooks/useFocusMonitor"
import { useModalState } from "~hooks/useModalState"
import InsertIcon from "~svgs/InsertSVG"

import ButtonIcon from "~svgs/ButtonSVG"

function PromptModal() {
  // const prompts = []
  const [userPrompt, setUserPrompt] = useState("")
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [input, setInput] = useState<string>("")
  const { activeInputElement } = useFocusMonitor() as any
  const [isModalOpen, setModalOpen] = useModalState()
  const closeModal = () => {
    const isOpen = !isModalOpen
    setModalOpen(isOpen)
  }

  useEffect(() => {
    console.log("modal")
    console.log(isModalOpen)
  }, [])
  const handleGenerate = () => {
    const response =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    setGeneratedResponse(response)
    setUserPrompt(input)
    setInput("")
  }

  const handleInsert = () => {
    try{
      if (
        activeInputElement.target &&
        activeInputElement.target.classList.contains("msg-form__contenteditable")
      ) {
        const contentEditableDiv = activeInputElement.target

        // Set the value of the contenteditable div
        const valueToSet = generatedResponse

        // Clear existing content, including placeholder
        contentEditableDiv.innerHTML = ""

        // Insert the generated response as a paragraph
        const p = document.createElement("p")
        p.textContent = valueToSet
        contentEditableDiv.appendChild(p)

        const inputEvent = new Event("input", { bubbles: true })
        const changeEvent = new Event("change", { bubbles: true })

        contentEditableDiv.dispatchEvent(inputEvent)
        contentEditableDiv.dispatchEvent(changeEvent)
        contentEditableDiv.focus()

        // Simulate Enter key press to send the message
        const enterEvent = new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13
        })
        setGeneratedResponse("")
        closeModal()
      }
    } catch(e){
        console.log('failed to insert response')
      }
    }
  if (!isModalOpen) return null

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
            value={input}
            className="rounded-md focus:outline-none p-1 text-md w-full bg-white border text-[#666D80]"
            onChange={(e) => setInput(e.target.value)}
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
                  if (input !== "") handleGenerate()
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
