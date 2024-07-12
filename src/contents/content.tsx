import { createRoot } from "react-dom/client"

import IconButton from "~features/IconButton"

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
  return (
    <div
      style={{
        position: "absolute",
        bottom: "35px",
        right: "40px",
        zIndex: 1000
      }}>
      <IconButton />
    </div>
  )
}

// // Store the root instance
let rootInstance = null

export const render = async ({ createRootContainer }) => {
  const rootContainer = await createRootContainer()

  // Check if root instance already exists
  if (!rootInstance) {
    rootInstance = createRoot(rootContainer)
  }

  rootInstance.render(<App />)
}
