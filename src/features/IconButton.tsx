import Icon from "../IconSVG"

function IconButton() {
  return (
    <button
      type="button"
      className="rounded-full transition-all border-none
      shadow-lg hover:shadow-md
      active:scale-105 bg-slate-50 hover:bg-slate-100 hover:text-slate-900">
      <Icon />
    </button>
  )
}

export default IconButton
