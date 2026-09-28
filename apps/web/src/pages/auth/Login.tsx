import React, { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, type User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/config/firebase"
import { useAuthStore, EMBEDDED_ADMIN_UID, type UserProfile } from "../../stores/auth-store"
import { Input } from "../../components/ui/Input"
import { EduOSLogo } from "../../components/ui/EduOSLogo"

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setSession, setLoading } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/student/dashboard"

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        const profileData = userDoc.data() as UserProfile
        setSession(user, profileData)
        if (profileData.role === "admin") navigate("/admin/dashboard", { replace: true })
        else if (profileData.role === "trainer") navigate("/trainer/dashboard", { replace: true })
        else navigate(from, { replace: true })
      } else {
        setSession(user, null)
        navigate("/onboarding", { replace: true })
      }
    } catch (err) {
      console.error(err)
      const errorObject = err as Error
      setError(errorObject.message || "Invalid credentials provided.")
      setLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError(null)
    setIsLoading(true)
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        const profileData = userDoc.data() as UserProfile
        setSession(user, profileData)
        if (profileData.role === "admin") navigate("/admin/dashboard", { replace: true })
        else if (profileData.role === "trainer") navigate("/trainer/dashboard", { replace: true })
        else navigate(from, { replace: true })
      } else {
        setSession(user, null)
        navigate("/onboarding", { replace: true })
      }
    } catch (err) {
      console.error(err)
      const errorObject = err as Error
      setError(errorObject.message || "Authentication error encountered.")
      setLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBypassAdminLogin = () => {
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
    navigate("/admin/dashboard", { replace: true })
  }

  const handleBypassTrainerLogin = () => {
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
    navigate("/trainer/dashboard", { replace: true })
  }

  const handleBypassStudentLogin = () => {
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
    navigate("/student/dashboard", { replace: true })
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#111827] flex flex-col justify-between font-sans selection:bg-[#00694f] selection:text-white">
      {/* Top Banner Navigation */}
      <header className="border-b border-black/[0.04] bg-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <EduOSLogo size="md" animated={true} />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00694f] animate-pulse" />
              SSO Sovereign Gateway
            </span>
            <Link
              to="/register"
              className="text-xs sm:text-sm font-semibold text-[#00694f] hover:text-[#00523e] transition-colors"
            >
              Request Admissions Account →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Login Two-Column Card */}
      <div className="max-w-4xl mx-auto w-full px-6 py-12 flex-1 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Academic Access Guidelines (5 cols) */}
          <div className="md:col-span-5 p-8 bg-[#fafafa] border-b md:border-b-0 md:border-r border-black/[0.04] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                ACADEMIC CREDENTIALS
              </div>
              <h2 className="text-xl font-bold text-[#111827] tracking-tight">
                Unified Portal Authentication
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Sign in with your institutional university email or authorized developer credentials to access:
              </p>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  <span>Enrolled graduate seminar workspaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  <span>HPC cluster GPU hours quota (H100)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  <span>Formal ECTS transcripts &amp; certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  <span>Research colloquium discussions</span>
                </li>
              </ul>
            </div>

            {/* Quick Access Roles */}
            <div className="pt-4 border-t border-black/[0.06] space-y-3">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                1-Click Simulation Roles:
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={handleBypassStudentLogin}
                  className="w-full text-left px-3.5 py-2.5 bg-white border border-gray-200/80 rounded-2xl hover:border-[#00694f] hover:bg-emerald-50/20 text-xs transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-semibold text-gray-800 group-hover:text-[#00694f]">Dhruv Varma</div>
                    <div className="text-[10px] text-gray-500 font-mono">Student Console</div>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-[#00694f] transition-transform group-hover:translate-x-0.5">→</span>
                </button>
                <button
                  type="button"
                  onClick={handleBypassTrainerLogin}
                  className="w-full text-left px-3.5 py-2.5 bg-white border border-gray-200/80 rounded-2xl hover:border-[#00694f] hover:bg-emerald-50/20 text-xs transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-semibold text-gray-800 group-hover:text-[#00694f]">Dr. Ananya Sharma</div>
                    <div className="text-[10px] text-gray-500 font-mono">Faculty Console</div>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-[#00694f] transition-transform group-hover:translate-x-0.5">→</span>
                </button>
                <button
                  type="button"
                  onClick={handleBypassAdminLogin}
                  className="w-full text-left px-3.5 py-2.5 bg-white border border-gray-200/80 rounded-2xl hover:border-[#00694f] hover:bg-emerald-50/20 text-xs transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-semibold text-gray-800 group-hover:text-[#00694f]">Institutional Registrar</div>
                    <div className="text-[10px] text-gray-500 font-mono">Administrative Oversight</div>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-[#00694f] transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Form (7 cols) */}
          <div className="md:col-span-7 p-8 sm:p-10 space-y-6">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
                Sign In to Workspace
              </h1>
              <p className="text-xs text-gray-500">
                Enter your registered institutional credentials to access your terminal.
              </p>
            </div>

            {error && (
              <div role="alert" className="p-3.5 border border-red-200 bg-red-50 text-red-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <Input
                label="Institutional Email"
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scholar@university.edu"
              />

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs" htmlFor="login-password">
                    Passphrase
                  </label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-[#00694f] hover:underline">
                    Reset Passphrase
                  </Link>
                </div>
                <Input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-3 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Validating Session...</span>
                  </>
                ) : (
                  "Authorize Sign In"
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-mono text-[11px]">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Sign in with Google Workspace</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Academic Security Specification
      </footer>
    </main>
  )
}
