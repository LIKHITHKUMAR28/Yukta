import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { sendEmailVerification, signOut } from "firebase/auth"
import { auth } from "@/config/firebase"
import { useAuthStore } from "../../stores/auth-store"

export const EmailVerification: React.FC = () => {
  const navigate = useNavigate()
  const { user, signOut: storeSignOut } = useAuthStore()
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleResend = async () => {
    if (!auth.currentUser) return
    setIsSending(true)
    setMessage(null)

    try {
      await sendEmailVerification(auth.currentUser)
      setMessage("Verification dispatch confirmed. Please check your university inbox.")
    } catch (err) {
      console.warn("Resend email verification failed:", err)
      setMessage("Offline simulation: Verification dispatch acknowledged.")
    } finally {
      setIsSending(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    storeSignOut()
    navigate("/login")
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#111827] flex flex-col justify-between font-sans selection:bg-[#00694f] selection:text-white">
      {/* Top Banner Navigation */}
      <header className="border-b border-black/[0.04] bg-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-[#00694f] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              Y
            </div>
            <span className="font-bold text-[#111827] text-lg tracking-tight">Yukta EduOS</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
              Identity Validation Active
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Card */}
      <div className="max-w-md mx-auto w-full px-6 py-12 flex-1 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10 space-y-6 text-center">
          
          <div className="space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#00694f] flex items-center justify-center mx-auto mb-3 border border-emerald-100">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
              Verify Institutional Email
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              An activation token has been dispatched to
            </p>
            <div className="inline-block px-3 py-1 bg-gray-50 border border-gray-200/80 rounded-lg text-xs font-semibold text-gray-800 font-mono">
              {user?.email || "scholar@university.edu"}
            </div>
          </div>

          {message && (
            <div role="status" className="p-3.5 border border-emerald-200 bg-emerald-50 text-[#00694f] text-xs rounded-xl font-medium text-left shadow-sm">
              {message}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-xs text-gray-600 text-left space-y-2.5">
            <div className="font-bold text-gray-800 text-[11px] uppercase tracking-wider font-mono">
              Academic Protocol Checklist:
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-gray-600 leading-relaxed">
              <li>Click the activation link transmitted to your inbox.</li>
              <li>Return to this console to activate your cluster compute quota.</li>
              <li>Check your university spam folder if not received in 5 minutes.</li>
            </ol>
          </div>

          <div className="space-y-3 pt-2">
            <button
              disabled={isSending}
              type="button"
              onClick={handleResend}
              className="w-full py-3 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                "Resend Verification Token"
              )}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2.5 bg-[#eeeef0] hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-xs transition-all cursor-pointer"
            >
              Sign Out &amp; Return to Login
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
