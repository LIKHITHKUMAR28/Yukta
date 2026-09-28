import React, { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Switch to Institutional Daylight Mode" : "Switch to Night Verification Mode"}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-xl bg-white hover:bg-[#eeeef0] border border-black/[0.06] text-on-surface-variant hover:text-primary flex items-center justify-center transition-all shadow-xs cursor-pointer"
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-primary" />
      ) : (
        <Sun className="w-4 h-4 text-on-surface-variant" />
      )}
    </button>
  )
}

