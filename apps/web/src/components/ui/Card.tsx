import * as React from "react"
import { cn } from "../../utils/tailwind-merge"

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-black/[0.04] bg-white text-on-surface shadow-[0px_4px_24px_rgba(0,0,0,0.04)]",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { hover?: boolean; ai?: boolean }>(
  ({ className, hover = true, ai = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        ai
          ? "bg-white/70 backdrop-blur-[12px] border border-primary/15 rounded-3xl text-on-surface shadow-[0px_4px_24px_rgba(0,0,0,0.04)]"
          : "bg-white border border-black/[0.04] rounded-3xl text-on-surface shadow-[0px_4px_24px_rgba(0,0,0,0.04)]",
        hover && "transition-all duration-300 hover:shadow-[0px_12px_36px_rgba(0,105,79,0.08)] hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  )
)
GlassCard.displayName = "GlassCard"

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight text-charcoal", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-steel", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0 border-t border-midnight-border mt-4", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"
