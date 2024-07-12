import { createRoot } from "react-dom/client"

import IconButton from "~features/IconButton"

export const getRootContainer = (): Promise<Element> =>
  new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      try {
        const rootContainer = document.querySelector(
          '[aria-label="Write a message…"]'
        )
        if (rootContainer && rootContainer.children[0]) {
          clearInterval(checkInterval)
          resolve(rootContainer.children[0])
        }
      } catch (error) {
        clearInterval(checkInterval)
        reject(new Error("Failed to find the root container."))
      }
    }, 100)
  })


const App = () => {
  return (
    <span
      style={{
        position: "absolute",
        bottom: "35px",
        right: "40px",
        zIndex: 1000
      }}>
      <IconButton />
    </span>
  )
}

// // Store the root instance
let rootInstance = null

export const render = async ({ createRootContainer }) => {
  try{
    
  const rootContainer = await createRootContainer()

  // Check if root instance already exists
  if (!rootInstance) {
    rootInstance = createRoot(rootContainer)
  }

  rootInstance.render(<App />)
} catch(e){
  console.error('Error rendering content:', e.error)
}
}
