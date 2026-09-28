import * as React from "react"
import { Loader2 } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { tailwindMerge } from "../../utils/tailwind-merge"

const cn = (...inputs: ClassValue[]) => tailwindMerge(clsx(inputs))

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "inverted" | "ghost" | "destructive" | "outline"
  size?: "sm" | "md" | "lg" | "icon"
  isLoading?: boolean
  glow?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, glow = false, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-button font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer"
    
    // Exactly matches the button specs shown in the design system board
    const variants = {
      // Primary: solid Emerald (#00694f) with crisp white text
      primary: "bg-[#00694f] text-white hover:bg-[#004f3a] border border-transparent shadow-sm",
      // Secondary: soft surface container (#eeeef0) with charcoal text
      secondary: "bg-[#eeeef0] text-[#1a1c1e] hover:bg-[#e2e2e5] border border-transparent",
      // Inverted: solid deep charcoal (#1a1c1e) with white text
      inverted: "bg-[#1a1c1e] text-white hover:bg-[#2f3133] border border-transparent shadow-sm",
      // Outlined: white surface with clean 1px neutral border (#bec9c2) and charcoal text
      outline: "bg-white text-[#1a1c1e] hover:bg-[#f3f3f6] border border-[#bec9c2]",
      // Ghost: transparent with subtle hover
      ghost: "bg-transparent text-[#1a1c1e] hover:bg-[#eeeef0] border border-transparent",
      // Destructive: semantic error red (#ba1a1a) with white text
      destructive: "bg-[#ba1a1a] text-white hover:bg-[#93000a] border border-transparent",
    }
    
    const sizes = {
      sm: "h-9 px-4 text-xs rounded-lg font-semibold",
      md: "h-11 px-6 text-sm rounded-[10px] font-semibold",
      lg: "h-12 px-8 text-base rounded-xl font-semibold",
      icon: "h-10 w-10 rounded-[10px]",
    }

    const glowStyles = glow && variant === "primary" ? "shadow-[0_8px_24px_rgba(0,105,79,0.2)]" : ""

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], glowStyles, className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
