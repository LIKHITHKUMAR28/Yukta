import React from "react"
import { Sparkles, Shapes, Tag, Trash2, Edit2 } from "lucide-react"

export interface ActionIconsGroupProps {
  onMagic?: () => void
  onShapes?: () => void
  onTag?: () => void
  onDelete?: () => void
  className?: string
}

export const ActionIconsGroup: React.FC<ActionIconsGroupProps> = ({
  onMagic,
  onShapes,
  onTag,
  onDelete,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={onMagic}
        title="AI Assistant / Magic"
        className="w-8 h-8 rounded-full bg-[#00694f] hover:bg-[#004f3a] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={onShapes}
        title="Topology / Structure"
        className="w-8 h-8 rounded-full bg-[#00694f] hover:bg-[#004f3a] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm cursor-pointer"
      >
        <Shapes className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={onTag}
        title="Tag / Categorize"
        className="w-8 h-8 rounded-full bg-[#2f3133] hover:bg-[#1a1c1e] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm cursor-pointer"
      >
        <Tag className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={onDelete}
        title="Remove / Clear"
        className="w-8 h-8 rounded-full bg-[#ba1a1a] hover:bg-[#93000a] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

export interface LabelPillProps {
  label?: string
  icon?: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "neutral"
  className?: string
}

export const LabelPill: React.FC<LabelPillProps> = ({
  label = "Label",
  icon = <Edit2 className="w-3.5 h-3.5" />,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: "bg-[#00694f] text-white hover:bg-[#004f3a]",
    secondary: "bg-[#eeeef0] text-[#1a1c1e] hover:bg-[#e2e2e5]",
    neutral: "bg-[#3c4741] text-white hover:bg-[#2f3133]",
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-DEFAULT text-xs font-semibold transition-all shadow-sm cursor-pointer ${variants[variant]} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
