import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuthStore } from "../stores/auth-store"
import { NotificationsBell } from "./NotificationsBell"
import { Menu, X } from "lucide-react"

import { EduOSLogo } from "./ui/EduOSLogo"

export const Header: React.FC = () => {
  const { user, profile, signOut } = useAuthStore()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Exact 6 links in the user-specified order:
  const navLinks = [
    { label: "Institutional Mission", to: "/about" },
    { label: "Curriculum Catalog", to: "/courses" },
    { label: "Faculty", to: "/mentors" },
    { label: "Colloquium Forum", to: "/discussion" },
    { label: "Verify Certificate", to: "/verify-certificate" },
    { label: "Departmental Directory", to: "/contact" },
  ]

  const dashboardPath =
    profile?.role === "admin"
      ? "/admin/dashboard"
      : profile?.role === "trainer"
      ? "/trainer/dashboard"
      : "/student/dashboard"

  return (
    <header className="w-full top-0 sticky z-50 bg-white/95 backdrop-blur-md border-b border-black/[0.04] transition-colors">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-3 max-w-container-max mx-auto">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link className="flex items-center gap-2.5 group" to="/">
            <EduOSLogo size="md" animated={true} />
          </Link>

          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs font-semibold transition-all py-1 cursor-pointer ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <NotificationsBell />


          {user ? (
            <div className="flex items-center gap-2">
              <Link to={dashboardPath}>
                <button
                  type="button"
                  className="bg-primary hover:bg-primary-container text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  My Workspace
                </button>
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="text-on-surface-variant hover:text-error text-xs font-mono px-2 py-1 transition-colors cursor-pointer"
                title="Sign out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button
                  type="button"
                  className="text-on-surface hover:text-primary text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-[#eeeef0] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="button"
                  className="bg-primary hover:bg-primary-container text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  Admissions
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-on-surface hover:bg-[#eeeef0] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-on-surface" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/[0.04] bg-white px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 shadow-md">
          <div className="font-mono text-[10px] text-on-surface-variant uppercase font-bold tracking-wider px-2 pb-1 border-b border-black/[0.04]">
            Academic Navigation
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-white"
                  : "text-on-surface hover:bg-[#eeeef0]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

