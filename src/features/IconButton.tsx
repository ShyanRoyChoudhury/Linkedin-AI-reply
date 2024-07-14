import { useFocusMonitor } from "~hooks/useFocusMonitor"
import { useModalState } from "~hooks/useModalState"

import Icon from "~svgs/IconSVG"

function IconButton() {
  //const isMessagePanelActive = useFocusMonitor(formRef);
  const { isMessagePanelActive, setMessagePanelActive } = useFocusMonitor()
  const [, setModalOpen] = useModalState()

  const handleClick = () => {
    setModalOpen(true)
    setMessagePanelActive(false)
  }
  return (
    isMessagePanelActive && (
        <button
          type="button"
          onClick={handleClick}
          tabIndex={0}
          className="anchor rounded-full transition-all border-none shadow-lg hover:shadow-md active:scale-105 outline-none"
        >
          <Icon className="w-5 h-5" />
        </button>
    )
)
}

export default IconButton
