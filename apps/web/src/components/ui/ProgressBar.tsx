import * as React from "react"
import { cn } from "../../utils/tailwind-merge"

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // Percentage 0 to 100
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary"
  showLabel?: boolean
}

/**
 * Yukta EduOS Progress Bar
 * Clean, restrained progress bar featuring Emerald Deep fill and subtle surface container track.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  value,
  size = "md",
  variant = "primary",
  showLabel = false,
  ...props
}) => {
  const percentage = Math.min(Math.max(0, value), 100)

  const sizes = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  }

  const fillColors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
  }

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold text-on-surface-variant font-mono">
          <span>Progress</span>
          <span className="text-primary font-bold">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/40", sizes[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", fillColors[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
