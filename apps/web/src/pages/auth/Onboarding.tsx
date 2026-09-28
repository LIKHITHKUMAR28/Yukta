import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/config/firebase"
import { useAuthStore } from "../../stores/auth-store"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"

export const Onboarding: React.FC = () => {
  const navigate = useNavigate()
  const { user, profile, setSession } = useAuthStore()

  const [step, setStep] = useState(1)
  const [institution, setInstitution] = useState("")
  const [degreeProgram, setDegreeProgram] = useState("Graduate Engineering (M.S. / Ph.D.)")
  const [researchArea, setResearchArea] = useState("Distributed Systems & Machine Learning")
  const [cudaPreference, setCudaPreference] = useState("CUDA 12.6 + PyTorch 2.5")
  const [sshPublicKey, setSshPublicKey] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid)
        await updateDoc(userRef, {
          institution: institution || "Independent Scholar",
          degreeProgram,
          researchArea,
          cudaPreference,
          onboardingCompleted: true,
        })

        if (profile) {
          setSession(user, {
            ...profile,
            role: profile.role || "student",
          })
        }
      }
      navigate("/student/dashboard", { replace: true })
    } catch (err) {
      console.error("Onboarding error:", err)
      navigate("/student/dashboard", { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepsList = [
    { num: 1, label: "Affiliation" },
    { num: 2, label: "Research Focus" },
    { num: 3, label: "Cluster Tenancy" },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#111827] flex flex-col justify-between font-sans selection:bg-[#00694f] selection:text-white">
      <Header />

      <main className="max-w-2xl mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center">
        {/* Main Card */}
        <div className="w-full bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10 space-y-8">
          
          {/* Top Progress & Matriculation Bar */}
          <div className="space-y-6 border-b border-black/[0.06] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                STAGE {step} OF 3
              </div>
              <div className="font-mono text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1 self-start sm:self-auto">
                Matriculation ID: <span className="font-semibold text-gray-800">{user?.uid ? user.uid.slice(0, 8).toUpperCase() : "STU-NEW"}</span>
              </div>
            </div>

            {/* Stepper Visual Tabs */}
            <div className="grid grid-cols-3 gap-3">
              {stepsList.map((s) => {
                const isActive = step === s.num
                const isCompleted = step > s.num
                return (
                  <div
                    key={s.num}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl border transition-all ${
                      isActive
                        ? "bg-emerald-50/50 border-[#00694f]/30"
                        : isCompleted
                        ? "bg-gray-50 border-gray-200/60"
                        : "bg-transparent border-gray-100 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isCompleted
                          ? "bg-[#00694f] text-white"
                          : isActive
                          ? "bg-[#00694f] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {isCompleted ? "✓" : s.num}
                    </div>
                    <span
                      className={`text-xs font-medium truncate ${
                        isActive ? "text-[#00694f] font-semibold" : isCompleted ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Step Heading */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                {step === 1 && "Academic Affiliation & Degree Program"}
                {step === 2 && "Primary Research & Technical Focus"}
                {step === 3 && "Cluster Tenancy & Environment Setup"}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {step === 1 && "Specify your accredited university and candidate degree enrollment level."}
                {step === 2 && "Select your core academic specialization to tailor syllabus recommendations."}
                {step === 3 && "Configure your high-performance container baseline and remote access keys."}
              </p>
            </div>
          </div>

          {/* Step 1: Affiliation */}
          {step === 1 && (
            <div className="space-y-5">
              <Input
                label="Home University or Academic Institution"
                required
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. Stanford University, ETH Zürich, IIT Bombay"
              />

              <div className="space-y-1.5">
                <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Current Degree Program
                </label>
                <select
                  value={degreeProgram}
                  onChange={(e) => setDegreeProgram(e.target.value)}
                  className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-sm text-[#111827] focus:border-[#00694f] focus:outline-none focus:ring-2 focus:ring-[#00694f]/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] cursor-pointer"
                >
                  <option value="Graduate Engineering (M.S. / Ph.D.)">Graduate Engineering (M.S. / Ph.D.)</option>
                  <option value="Undergraduate Senior Division">Undergraduate Senior Division</option>
                  <option value="Postdoctoral & Industry Researcher">Postdoctoral &amp; Industry Researcher</option>
                  <option value="Self-Directed Open Academic Scholar">Self-Directed Open Academic Scholar</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-2.5 px-6 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Step 2</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Research Focus */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Primary Research Division
                </label>
                <select
                  value={researchArea}
                  onChange={(e) => setResearchArea(e.target.value)}
                  className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-sm text-[#111827] focus:border-[#00694f] focus:outline-none focus:ring-2 focus:ring-[#00694f]/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] cursor-pointer"
                >
                  <option value="Distributed Systems & Machine Learning">Distributed Systems &amp; Machine Learning</option>
                  <option value="Formal Verification & Model Safety">Formal Verification &amp; Model Safety</option>
                  <option value="Numerical Optimization & Applied Mathematics">Numerical Optimization &amp; Applied Mathematics</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/40 text-xs text-gray-700 leading-relaxed flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#00694f] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">ℹ</span>
                <span>
                  Your selection automatically provisions course catalogs, syllabus modules, and colloquium room channels mapped to this academic track.
                </span>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-2.5 px-5 bg-[#eeeef0] hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-all cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="py-2.5 px-6 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Step 3</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Cluster Tenancy */}
          {step === 3 && (
            <form onSubmit={handleFinish} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Preferred Supercomputing Container Baseline
                </label>
                <select
                  value={cudaPreference}
                  onChange={(e) => setCudaPreference(e.target.value)}
                  className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-sm text-[#111827] font-mono focus:border-[#00694f] focus:outline-none focus:ring-2 focus:ring-[#00694f]/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] cursor-pointer"
                >
                  <option value="CUDA 12.6 + PyTorch 2.5">CUDA 12.6 + PyTorch 2.5 (Recommended for NVIDIA H100)</option>
                  <option value="CUDA 12.4 + PyTorch 2.4">CUDA 12.4 + PyTorch 2.4 (LTS Stability)</option>
                  <option value="ROCm 6.2 + PyTorch 2.4">ROCm 6.2 + PyTorch 2.4 (AMD Instinct MI300X)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Public SSH Key (For Git &amp; Cluster Access, Optional)
                </label>
                <textarea
                  rows={3}
                  value={sshPublicKey}
                  onChange={(e) => setSshPublicKey(e.target.value)}
                  placeholder="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5..."
                  className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-xs text-[#111827] font-mono placeholder:text-gray-400 focus:border-[#00694f] focus:outline-none focus:ring-2 focus:ring-[#00694f]/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
                />
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-2.5 px-5 bg-[#eeeef0] hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-all cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="py-2.5 px-6 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Provisioning Tenancy...</span>
                    </>
                  ) : (
                    "Complete Setup & Launch Console"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Academic Setup Protocol
      </footer>
    </div>
  )
}
