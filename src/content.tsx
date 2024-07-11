// export default PlasmoOverlay

import type { PlasmoGetOverlayAnchor } from "plasmo"
import { useState } from "react"
import { createRoot } from "react-dom/client"

import IconButton from "~features/IconButton"
import PromptModal from "~features/PromptModal"

// import cssText from "data-text:~style.css"
// import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
// import { useState } from "react"

// import IconButton from "~features/IconButton"
// import PromptModal from "~features/PromptModal"

// export const config: PlasmoCSConfig = {
//   matches: ["https://*.linkedin.com/*"]
// }

// export const getStyle = () => {
//   const style = document.createElement("style")
//   style.textContent = cssText
//   return style
// }

// // export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
// //   document.querySelector('[aria-label="Messaging"]')

// const PlasmoOverlay = () => {
//   const [isModalOpen, setModalOpen] = useState(false)
//   return (
//     <div>
//       <div className="z-50 ">
//         <PromptModal isOpen={isModalOpen} setModalOpen={setModalOpen} />
//       </div>
//       <IconButton setModalOpen={setModalOpen} />
//     </div>
//   )
// }

export const getRootContainer = (): Promise<Element> =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainer = document.querySelector(
        '[aria-label="Write a message…"]'
      )
      if (rootContainer && rootContainer.children[0]) {
        clearInterval(checkInterval)
        resolve(rootContainer.children[0])
      }
    })
  })

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  return <IconButton setModalOpen={setModalOpen} />
}

// export const render = async ({ createRootContainer }) => {
//   const rootContainer = await createRootContainer()
//   const root = createRoot(rootContainer)
//   root.render(<App />)
// }

// Store the root instance
let rootInstance = null

export const render = async ({ createRootContainer }) => {
  const rootContainer = await createRootContainer()

  // Check if root instance already exists
  if (!rootInstance) {
    rootInstance = createRoot(rootContainer)
  }

  rootInstance.render(<App />)
}
