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
//       {/* <IconButton setModalOpen={setModalOpen} /> */}
//     </div>
//   )
// }

// export default PlasmoOverlay
