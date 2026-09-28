import * as React from "react"
import { Sparkles } from "lucide-react"
import { cn } from "../../utils/tailwind-merge"

export interface AIAssistChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  floating?: boolean
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

/**
 * AI Assist Chip
 * Represents Yukta EduOS AI-first capabilities using an Emerald-to-Mint subtle gradient,
 * a small sparkle icon, and pill geometry.
 */
export const AIAssistChip: React.FC<AIAssistChipProps> = ({
  className,
  label = "Yukta AI Assistant",
  floating = false,
  size = "md",
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px] gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-3.5 py-1.5 text-sm gap-2"
  }[size]

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "inline-flex items-center font-semibold font-label-md rounded-full",
        "bg-gradient-to-r from-primary to-[#00A37B] text-white",
        "shadow-[0px_4px_16px_rgba(0,105,79,0.2)] border border-primary/20",
        "transition-all duration-300 hover:brightness-105 active:scale-95",
        sizeClasses,
        floating && "fixed bottom-6 right-6 z-40 shadow-[0px_10px_30px_rgba(0,105,79,0.3)]",
        onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      <Sparkles className="w-3.5 h-3.5 text-secondary-fixed shrink-0" />
      <span>{label}</span>
    </div>
  )
}
