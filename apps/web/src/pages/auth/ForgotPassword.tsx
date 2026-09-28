import React, { useState } from "react"
import { Link } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/config/firebase"
import { Input } from "../../components/ui/Input"

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await sendPasswordResetEmail(auth, email.trim())
      setSuccess(true)
    } catch (err) {
      console.warn("Password reset fallback:", err)
      setSuccess(true)
    } finally {
      setIsLoading(false)
    }
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
              Credential Recovery
            </span>
            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-[#00694f] hover:text-[#00523e] transition-colors"
            >
              ← Return to Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Card */}
      <div className="max-w-md mx-auto w-full px-6 py-12 flex-1 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00694f] flex items-center justify-center mx-auto mb-2 border border-emerald-100">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
              Reset Passphrase
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              Enter your registered institutional university email to receive passphrase reset instructions.
            </p>
          </div>

          {error && (
            <div role="alert" className="p-3.5 border border-red-200 bg-red-50 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {success ? (
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#00694f] text-white flex items-center justify-center mx-auto text-base font-bold shadow-sm">
                ✓
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[#111827] text-sm">Instructions Transmitted</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  If an authorized profile exists for <span className="font-semibold text-gray-900">{email}</span>, a secure recovery token has been dispatched.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-block w-full py-2.5 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <Input
                label="Registered Institutional Email"
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scholar@university.edu"
              />

              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-3 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer pt-3"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Instructions...</span>
                  </>
                ) : (
                  "Transmit Passphrase Reset Link"
                )}
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link to="/login" className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Remember your passphrase? Sign In →
            </Link>
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
