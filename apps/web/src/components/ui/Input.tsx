import * as React from "react"
import { cn } from "../../utils/tailwind-merge"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-label-md font-semibold text-on-surface-variant uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-sm text-on-surface placeholder:text-outline transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <span className="text-xs text-error">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-on-surface-variant">{helperText}</span>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"
