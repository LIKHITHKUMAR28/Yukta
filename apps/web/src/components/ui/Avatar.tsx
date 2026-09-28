import * as React from "react"
import { cn } from "../../utils/tailwind-merge"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null
  alt?: string
  fallback: string
  size?: "sm" | "md" | "lg" | "xl"
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  alt = "avatar",
  fallback,
  size = "md",
  ...props
}) => {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
    xl: "h-20 w-20 text-2xl",
  }

  const [hasError, setHasError] = React.useState(false)

  // Get first 2 letters of fallback initials
  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U"

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 font-semibold text-slate-300 overflow-hidden select-none",
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}
