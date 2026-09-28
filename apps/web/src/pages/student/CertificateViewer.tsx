import React, { useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuthStore } from "../../stores/auth-store"
import { Header } from "../../components/Header"
import { EduOSLogo } from "../../components/ui/EduOSLogo"

export const CertificateViewer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const { user, profile } = useAuthStore()
  const printAreaRef = useRef<HTMLDivElement | null>(null)

  const coursesDb: Record<string, { title: string; code: string; credits: string; director: string }> = {
    "cs-704": {
      code: "CS-704",
      title: "Advanced Machine Learning Systems: Foundations to Production",
      credits: "4.0 ECTS Units",
      director: "Dr. Ananya Sharma"
    },
    "cs-602": {
      code: "CS-602",
      title: "Distributed Operating Systems & Collective Interconnect Topologies",
      credits: "3.5 ECTS Units",
      director: "Dr. Vikram Malhotra"
    }
  }

  const course = coursesDb[courseId || ""] || {
    code: "CS-704",
    title: "Advanced Machine Learning Systems: Foundations to Production",
    credits: "4.0 ECTS Units",
    director: "Dr. Ananya Sharma"
  }

  const studentName = profile?.displayName || user?.email?.split("@")[0] || "Dhruv M. Varma"
  const studentId = user?.uid ? `STU-${user.uid.slice(0, 6).toUpperCase()}` : "STU-882104"
  const issueDate = "October 14, 2026"
  const certId = `YUKTA-2026-${course.code}-8842`
  const verificationUrl = `${window.location.origin}/verify-certificate?id=${certId}`

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#111827] flex flex-col justify-between font-sans selection:bg-[#00694f] selection:text-white">
      <Header />

      {/* Header Bar */}
      <div className="border-b border-black/[0.04] bg-white px-6 py-6 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/student/dashboard" className="text-xs font-semibold text-[#00694f] hover:underline flex items-center gap-1">
              <span>← Return to Student Console</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
                Official Academic Transcript &amp; Diploma
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                Cryptographically Verified
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/verify-certificate?id=${certId}`}
              className="py-2.5 px-4 bg-[#eeeef0] hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium transition-all"
            >
              Inspect Public Registry
            </Link>
            <button
              type="button"
              onClick={handlePrint}
              className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Download &amp; Print Official PDF</span>
              <span>↓</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Diploma Parchment Container */}
      <main className="max-w-4xl mx-auto w-full px-6 py-10 flex-1 flex items-center justify-center">
        <div
          ref={printAreaRef}
          className="w-full bg-white rounded-3xl border-2 border-emerald-900/10 shadow-[0px_8px_32px_rgba(0,0,0,0.06)] p-8 sm:p-14 space-y-8 relative overflow-hidden"
        >
          {/* Subtle Guilloche / Watermark Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Institutional Letterhead */}
          <div className="text-center space-y-3 border-b-2 border-black/[0.06] pb-8">
            <div className="flex justify-center mx-auto">
              <EduOSLogo size={56} variant="icon-only" />
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#00694f] font-bold">
              School of Computing &amp; Advanced Engineering
            </div>
            <h2 className="text-2xl sm:text-4xl text-[#111827] font-bold tracking-tight">
              YUKTA ACADEMIC CONSORTIUM
            </h2>
            <div className="text-xs text-gray-500 font-mono">
              Accredited under European Credit Transfer and Accumulation System (ECTS) Standard ECTS-2026
            </div>
          </div>

          {/* Award Text Body */}
          <div className="text-center space-y-5 max-w-2xl mx-auto py-2">
            <p className="text-label-md text-gray-400 uppercase tracking-widest text-xs font-mono font-semibold">
              This is to officially certify that
            </p>
            <div className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight border-b border-black/[0.08] pb-3">
              {studentName}
            </div>
            <div className="font-mono text-xs text-[#00694f] font-bold">
              Student Matriculation ID: {studentId}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              has satisfactorily completed all laboratory benchmarks, supercomputing kernel implementations, theoretical examinations, and capstone requirements for the accredited graduate curriculum:
            </p>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="font-mono text-xs font-bold text-[#00694f]">{course.code}</span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                {course.title}
              </h3>
            </div>
            <p className="text-xs text-gray-600">
              conferring <strong className="text-gray-900 font-semibold">{course.credits}</strong> with High Distinction (Grade A+).
            </p>
          </div>

          {/* Institutional Signatures & QR Code Verification Seal */}
          <div className="pt-8 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-center items-end">
            
            {/* Signature 1: Course Director */}
            <div className="space-y-2">
              <div className="font-serif italic text-lg text-gray-900 font-bold">
                {course.director}
              </div>
              <div className="border-t border-gray-200 pt-1 font-mono text-[11px] text-gray-500">
                Course Director &amp; Lab Chair
              </div>
            </div>

            {/* Center: Interactive QR Verification Seal */}
            <div className="flex flex-col items-center space-y-2 p-3 bg-gray-50/80 rounded-2xl border border-gray-100">
              <a
                href={verificationUrl}
                target="_blank"
                rel="noreferrer"
                title="Click or scan to verify online"
                className="w-20 h-20 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs flex items-center justify-center hover:scale-105 transition-transform"
              >
                {/* SVG Rendered QR Code Pattern */}
                <svg className="w-full h-full text-gray-900" viewBox="0 0 29 29" fill="currentColor">
                  {/* Position detection patterns */}
                  <path d="M0 0h7v7H0zM2 2h3v3H2zM22 0h7v7h-7zM24 2h3v3h-3zM0 22h7v7H0zM2 24h3v3H2z" />
                  {/* Data blocks */}
                  <path d="M9 1h2v2H9zM13 1h3v2h-3zM18 1h2v3h-2zM9 5h3v2H9zM14 4h2v3h-2zM18 6h2v2h-2zM0 9h2v2H0zM4 9h2v3H4zM8 9h2v2H8zM12 9h2v2h-2zM16 9h3v2h-3zM21 9h2v2h-2zM25 9h4v2h-4zM2 13h2v2H2zM6 13h2v2H6zM10 13h2v2h-2zM14 13h3v2h-3zM19 13h2v2h-2zM23 13h2v2h-2zM27 13h2v2h-2zM0 17h3v2H0zM5 17h2v2H5zM9 17h2v2H9zM13 17h2v2h-2zM17 17h2v2h-2zM21 17h2v2h-2zM25 17h3v2h-3zM9 21h2v3H9zM13 21h3v2h-3zM18 21h2v2h-2zM22 21h2v2h-2zM26 21h3v2h-3zM9 25h3v3H9zM14 25h2v2h-2zM18 25h2v2h-2zM22 25h4v3h-4z" />
                </svg>
              </a>
              <div className="space-y-0.5 text-center font-mono">
                <a href={verificationUrl} target="_blank" rel="noreferrer" className="font-bold text-[#00694f] text-[10px] uppercase hover:underline">
                  Scan to Verify ↗
                </a>
                <div className="text-[9px] text-gray-400">ID: {certId}</div>
              </div>
            </div>

            {/* Signature 2: Academic Registrar */}
            <div className="space-y-2">
              <div className="font-serif italic text-lg text-gray-900 font-bold">
                Institutional Registrar
              </div>
              <div className="border-t border-gray-200 pt-1 font-mono text-[11px] text-gray-500">
                Board of Academic Accreditation
              </div>
            </div>
          </div>

          {/* Cryptographic SHA-256 Ledger Stamp */}
          <div className="text-center font-mono text-[10px] text-gray-400 border-t border-black/[0.04] pt-4">
            SHA-256 Notarization Hash: 4a7f21b8c9d0e1f2a3b4c5d6e7f8a9b0123456789abcdef012345678871b9c3a • {issueDate}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12 print:hidden">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Formal Academic Credential Standard
      </footer>
    </div>
  )
}
