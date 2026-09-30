function Tooltip({ text }) {
  if (!text?.trim()) return null

  return <span className="tooltip" role="tooltip">{text}</span>
}

export default Tooltip
