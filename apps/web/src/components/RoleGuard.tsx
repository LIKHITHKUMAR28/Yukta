import React from "react"
import { useLocation, Link } from "react-router-dom"
import { useAuthStore, EMBEDDED_ADMIN_UID, type UserProfile } from "../stores/auth-store"
import { Loader2, ShieldCheck, UserCheck, GraduationCap, School } from "lucide-react"
import { Button } from "./ui/Button"
import { AIAssistChip } from "./ui/AIAssistChip"
import { EduOSLogo } from "./ui/EduOSLogo"
import type { User } from "firebase/auth"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles?: ("student" | "trainer" | "admin")[]
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user, profile, loading, initialized, setSession } = useAuthStore()
  const location = useLocation()

  const activatePersona = (role: "student" | "trainer" | "admin") => {
    if (role === "admin") {
      const mockUser = {
        uid: EMBEDDED_ADMIN_UID,
        email: "admin@yuktaedu.os",
        displayName: "Institutional Registrar",
        emailVerified: true,
      } as unknown as User
      const mockProfile: UserProfile = {
        uid: EMBEDDED_ADMIN_UID,
        email: "admin@yuktaedu.os",
        displayName: "Institutional Registrar",
        role: "admin",
        createdAt: new Date().toISOString(),
      }
      setSession(mockUser, mockProfile)
    } else if (role === "trainer") {
      const mockUser = {
        uid: "mock-trainer-ananya",
        email: "ananya.sharma@yuktaedu.os",
        displayName: "Dr. Ananya Sharma",
        emailVerified: true,
      } as unknown as User
      const mockProfile: UserProfile = {
        uid: "mock-trainer-ananya",
        email: "ananya.sharma@yuktaedu.os",
        displayName: "Dr. Ananya Sharma",
        role: "trainer",
        createdAt: new Date().toISOString(),
      }
      setSession(mockUser, mockProfile)
    } else {
      const mockUser = {
        uid: "mock-student-dhruv",
        email: "dhruv.varma@university.edu",
        displayName: "Dhruv Varma",
        emailVerified: true,
      } as unknown as User
      const mockProfile: UserProfile = {
        uid: "mock-student-dhruv",
        email: "dhruv.varma@university.edu",
        displayName: "Dhruv Varma",
        role: "student",
        createdAt: new Date().toISOString(),
      }
      setSession(mockUser, mockProfile)
    }
  }

  if (loading || !initialized) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-on-surface-variant font-mono text-xs">Validating cryptographic credentials...</p>
        </div>
      </div>
    )
  }

  // If not authenticated or role mismatch, display persona gateway card
  const hasAccess = user && profile && (!allowedRoles || allowedRoles.includes(profile.role))

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-on-surface flex flex-col justify-between font-sans selection:bg-primary/10 selection:text-primary">
        <header className="border-b border-black/[0.04] bg-white py-3.5 px-6">
          <div className="max-w-container-max mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <EduOSLogo size="md" animated={true} />
            </Link>
            <Link to="/">
              <Button variant="secondary" size="sm">Return to Public Portal</Button>
            </Link>
          </div>
        </header>

        <main className="max-w-xl mx-auto w-full px-4 py-12">
          <div className="border border-black/[0.04] bg-white rounded-3xl p-8 md:p-10 shadow-[0px_8px_30px_rgba(0,105,79,0.08)] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
                  Console Clearance Required
                </span>
              </div>
              <AIAssistChip label="Instant 1-Click Access" size="sm" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-on-surface tracking-tight">
                Select Your Academic Persona
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                You are accessing a secured academic operating console at <span className="font-mono text-primary font-bold">{location.pathname}</span>. Choose an authorized persona below to load full workspace permissions immediately.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {(!allowedRoles || allowedRoles.includes("student")) && (
                <button
                  type="button"
                  onClick={() => activatePersona("student")}
                  className="w-full text-left p-4.5 border border-black/[0.06] rounded-2xl bg-[#f8f9fa] hover:border-primary/40 hover:bg-[#f0fdf4] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">
                        Dhruv Varma • Student Scholar
                      </div>
                      <div className="text-xs text-on-surface-variant font-mono">
                        Graduate Machine Learning &amp; Systems Cohort
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">Activate →</span>
                </button>
              )}

              {(!allowedRoles || allowedRoles.includes("trainer")) && (
                <button
                  type="button"
                  onClick={() => activatePersona("trainer")}
                  className="w-full text-left p-4.5 border border-black/[0.06] rounded-2xl bg-[#f8f9fa] hover:border-primary/40 hover:bg-[#f0fdf4] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">
                        Dr. Ananya Sharma • Faculty Course Director
                      </div>
                      <div className="text-xs text-on-surface-variant font-mono">
                        Distributed Systems &amp; Neural Compute Lab
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">Activate →</span>
                </button>
              )}

              {(!allowedRoles || allowedRoles.includes("admin")) && (
                <button
                  type="button"
                  onClick={() => activatePersona("admin")}
                  className="w-full text-left p-4.5 border border-black/[0.06] rounded-2xl bg-[#f8f9fa] hover:border-primary/40 hover:bg-[#f0fdf4] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">
                        Institutional Registrar • System Administrator
                      </div>
                      <div className="text-xs text-on-surface-variant font-mono">
                        Campus Accreditation &amp; Multi-Cluster Quotas
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">Activate →</span>
                </button>
              )}
            </div>

            <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between text-xs text-on-surface-variant">
              <span>Have registered credentials?</span>
              <Link to="/login" className="font-bold text-primary hover:underline">
                Open Standard Login Form →
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t border-black/[0.04] bg-white py-3.5 text-center text-xs text-on-surface-variant font-mono">
          Yukta EduOS • Role Verification &amp; Access Gateway
        </footer>
      </div>
    )
  }

  return <>{children}</>
}

