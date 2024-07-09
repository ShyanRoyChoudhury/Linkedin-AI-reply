import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import { CountButton } from "~features/CountButton"
import IconButton from "~features/IconButton"
import { useChatFocus } from "~hooks/useChatFocus"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const isMessagePanelActive = useChatFocus()
  if (!isMessagePanelActive) return null
  return (
    <div>
      <div className="z-50 flex fixed bottom-0 ">
        <IconButton />
      </div>
      <div className="z-50 flex fixed top-32 right-8">
        <CountButton />
      </div>
    </div>
  )
}

export default PlasmoOverlay
