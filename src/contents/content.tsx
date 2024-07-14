import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import IconButton from "~features/IconButton"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = `
  .anchor {
    anchor-name: --testanchor;
    border: none;
    outline: none;
  }
  .anchor-target {
    position-anchor: --anchortome;
  position: absolute;
  inset-area: top span-all;
  }
  
  ` 
  return style
}

import type { PlasmoGetOverlayAnchorList } from "plasmo"
 
export const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async () =>{
  const root = document.querySelectorAll('[aria-label="Write a message…"]')

  root.forEach((element) => {
    element.classList.add("anchor-target") 
  })

  return root
}


const App = () => {
  return (
        <IconButton />
  )
}

export default App;