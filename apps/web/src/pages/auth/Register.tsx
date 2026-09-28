import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/config/firebase"
import { useAuthStore } from "../../stores/auth-store"
import { Input } from "../../components/ui/Input"
import { EduOSLogo } from "../../components/ui/EduOSLogo"

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { setSession, setLoading } = useAuthStore()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    if (!termsAccepted) {
      setError("You must acknowledge the Institutional Terms of Enrollment and Student Privacy Policy.")
      return
    }

    if (trimmedName.length < 2) {
      setError("Full legal name must contain at least 2 characters.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid institutional or personal email address.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passphrases do not match.")
      return
    }

    if (password.length < 8) {
      setError("Passphrase must be at least 8 characters.")
      return
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Passphrase must contain at least one letter and one number.")
      return
    }

    setIsLoading(true)
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password)
      const user = userCredential.user

      await updateProfile(user, { displayName: trimmedName })

      const profileData = {
        uid: user.uid,
        email: user.email || trimmedEmail,
        displayName: trimmedName,
        role: "student" as const,
        createdAt: new Date().toISOString(),
      }

      await setDoc(doc(db, "users", user.uid), profileData)

      setSession(user, profileData)
      navigate("/onboarding", { replace: true })
    } catch (err: unknown) {
      console.error("Registration error:", err)
      const firebaseError = err as { code?: string; message?: string }
      if (firebaseError?.code === "auth/email-already-in-use") {
        setError("An academic account with this email address already exists. Please sign in.")
      } else if (firebaseError?.code === "auth/weak-password") {
        setError("The provided passphrase does not meet minimum complexity standards.")
      } else {
        setError("Unable to complete academic registration. Please verify your details and try again.")
      }
      setLoading(false)
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
            <EduOSLogo size="md" animated={true} />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
              Admissions Registry
            </span>
            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-[#00694f] hover:text-[#00523e] transition-colors"
            >
              Already registered? Sign In →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Form Card */}
      <div className="max-w-xl mx-auto w-full px-6 py-12 flex-1 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
              ACADEMIC ADMISSIONS
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight pt-1">
              Create Scholar Profile
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Register for course auditing, lab cluster access, and transcribed ECTS credits.
            </p>
          </div>

          {error && (
            <div role="alert" className="p-3.5 border border-red-200 bg-red-50 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Candidate Legal Name"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name as recognized by university"
            />

            <Input
              label="Institutional Email Address"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="scholar@university.edu"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Passphrase"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
              />

              <Input
                label="Confirm Passphrase"
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat passphrase"
              />
            </div>

            <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded-md border-gray-300 text-[#00694f] focus:ring-[#00694f] cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                I agree to the{" "}
                <Link to="/about" className="font-medium text-[#00694f] hover:underline">
                  Academic Honor Code
                </Link>
                , Terms of Enrollment, and FERPA Student Privacy Policy.
              </label>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer pt-3"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Profile...</span>
                </>
              ) : (
                "Submit Academic Registration"
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-gray-500">Already registered? </span>
            <Link to="/login" className="text-xs font-semibold text-[#00694f] hover:underline">
              Sign In to Workspace →
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
