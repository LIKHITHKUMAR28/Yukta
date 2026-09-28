import React from "react"

interface EduOSLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | number
  variant?: "icon-only" | "full"
  showSubtext?: boolean
  className?: string
  animated?: boolean
}

export const EduOSLogo: React.FC<EduOSLogoProps> = ({
  size = "md",
  variant = "full",
  showSubtext = true,
  className = "",
  animated = false,
}) => {
  // Determine pixel size for icon
  const pixelSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 28
      : size === "md"
      ? 36
      : size === "lg"
      ? 48
      : 64

  const IconSVG = (
    <div
      style={{ width: pixelSize, height: pixelSize }}
      className={`relative shrink-0 flex items-center justify-center ${animated ? "group" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 128 128"
        width={pixelSize}
        height={pixelSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="eduosBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004d3a" />
            <stop offset="50%" stopColor="#00694f" />
            <stop offset="100%" stopColor="#008a66" />
          </linearGradient>
          <linearGradient id="eduosGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>
          <linearGradient id="eduosLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d1fae5" />
          </linearGradient>
          <filter id="eduosShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#00694f" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer Rounded Squircle Base */}
        <rect x="8" y="8" width="112" height="112" rx="30" fill="url(#eduosBgGrad)" filter="url(#eduosShadow)" />
        <rect x="8" y="8" width="112" height="112" rx="30" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1.5" />

        {/* Outer Neural Hexagonal Ring Web */}
        <g opacity="0.35" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="2 3">
          <polygon points="64,22 98,42 98,82 64,102 30,82 30,42" fill="none" />
        </g>

        {/* Hexagonal Constellation Vertex Nodes */}
        <circle cx="64" cy="22" r="3" fill="#6ee7b7" opacity="0.8" />
        <circle cx="98" cy="42" r="3" fill="#6ee7b7" opacity="0.8" />
        <circle cx="98" cy="82" r="3" fill="#6ee7b7" opacity="0.8" />
        <circle cx="64" cy="102" r="3" fill="#6ee7b7" opacity="0.8" />
        <circle cx="30" cy="82" r="3" fill="#6ee7b7" opacity="0.8" />
        <circle cx="30" cy="42" r="3" fill="#6ee7b7" opacity="0.8" />

        {/* Radiating Interconnect Traces */}
        <line x1="64" y1="22" x2="64" y2="40" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.45" />
        <line x1="98" y1="42" x2="80" y2="52" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.45" />
        <line x1="30" y1="42" x2="48" y2="52" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.45" />

        {/* Primary Geometric 'Y' Monogram */}
        <path d="M42 36 L64 64" stroke="url(#eduosLineGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M86 36 L64 64" stroke="url(#eduosLineGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M64 64 L64 92" stroke="url(#eduosLineGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Inner Circuit Core Accent */}
        <path d="M52 42 L64 57 L76 42" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        <line x1="64" y1="62" x2="64" y2="84" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />

        {/* Terminal Computational Circuit Nodes */}
        <circle cx="42" cy="36" r="4.5" fill="#ffffff" stroke="#004d3a" strokeWidth="1.5" />
        <circle cx="86" cy="36" r="4.5" fill="#ffffff" stroke="#004d3a" strokeWidth="1.5" />
        <circle cx="64" cy="92" r="4.5" fill="#ffffff" stroke="#004d3a" strokeWidth="1.5" />

        {/* Central Nexus Core Spark */}
        <circle cx="64" cy="64" r="5" fill="url(#eduosGlow)" />
        <circle cx="64" cy="64" r="2" fill="#ffffff" />
      </svg>
    </div>
  )

  if (variant === "icon-only") {
    return IconSVG
  }

  return (
    <div className="flex items-center gap-2.5">
      {IconSVG}
      <div className="flex flex-col">
        <span
          className={`font-headline-sm font-bold text-primary tracking-tight leading-none ${
            size === "sm" ? "text-base" : size === "lg" || size === "xl" ? "text-2xl" : "text-lg"
          }`}
        >
          Yukta EduOS
        </span>
        {showSubtext && (
          <span className="text-[9px] text-on-surface-variant uppercase tracking-wider mt-0.5 font-mono">
            Academic Operating System
          </span>
        )}
      </div>
    </div>
  )
}
export default EduOSLogo
