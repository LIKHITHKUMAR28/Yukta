import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Home as HomeIcon, Search, User, MessageSquare, Sparkles } from "lucide-react"

export interface FloatingDockProps {
  className?: string
  onAiClick?: () => void
}

/**
 * Floating Navigation Pill Dock
 * Directly inspired by the Yukta EduOS visual system board.
 */
export const FloatingDock: React.FC<FloatingDockProps> = ({ className = "", onAiClick }) => {
  const location = useLocation()

  const items = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/courses", icon: Search, label: "Catalog" },
    { to: "/discussion", icon: MessageSquare, label: "Colloquium" },
    { to: "/student/dashboard", icon: User, label: "Workspace" },
  ]

  return (
    <aside aria-label="Quick Actions Dock" className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 ${className}`}>
      <div className="flex items-center gap-2 p-1.5 bg-[#eeeef0]/95 backdrop-blur-md border border-[#bec9c2]/70 rounded-full shadow-[0px_8px_30px_rgba(0,0,0,0.08)]">
        {items.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to))
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              title={item.label}
              className={`p-2.5 rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-[#00694f] text-white shadow-sm"
                  : "text-[#3f4944] hover:text-[#1a1c1e] hover:bg-[#e2e2e5]"
              }`}
            >
              <Icon className="w-4 h-4" />
            </Link>
          )
        })}

        <div className="h-5 w-[1px] bg-[#bec9c2]/80 mx-0.5" />

        <button
          type="button"
          onClick={onAiClick}
          title="Yukta AI Copilot"
          className="p-2.5 rounded-full bg-[#00694f] text-white hover:bg-[#004f3a] transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </aside>
  )
}
