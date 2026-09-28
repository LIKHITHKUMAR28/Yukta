import * as React from "react"
import { cn } from "../../utils/tailwind-merge"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline"
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", ...props }) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold font-label-md transition-colors"
  
  const variants = {
    // Primary / default: Emerald (#004f3a / #00694f)
    default: "bg-primary/10 text-primary border border-primary/20",
    // Success: green
    success: "bg-[#007255]/10 text-[#007255] border border-[#007255]/20",
    // Warning: amber
    warning: "bg-amber-500/10 text-amber-700 border border-amber-500/20",
    // Danger / Error: red
    danger: "bg-error/10 text-error border border-error/20",
    // Info: secondary emerald tint
    info: "bg-secondary/10 text-secondary border border-secondary/20",
    // Outline: neutral outline
    outline: "bg-transparent text-on-surface-variant border border-outline-variant",
  }

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}
