import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { AIAssistChip } from "../../components/ui/AIAssistChip"
import { Button } from "../../components/ui/Button"
import { ShieldCheck, Award, Search, ArrowRight } from "lucide-react"



interface CertificateRecord {
  id: string
  studentName: string
  studentId: string
  courseCode: string
  courseTitle: string
  credits: string
  term: string
  issuedDate: string
  grade: string
  status: "verified" | "revoked" | "provisional"
  sha256Digest: string
  registrarSignature: string
  issuingBoard: string
}

const SAMPLE_DATABASE: Record<string, CertificateRecord> = {
  "YUKTA-2026-CS704-8842": {
    id: "YUKTA-2026-CS704-8842",
    studentName: "Dhruv M. Varma",
    studentId: "STU-882104",
    courseCode: "CS-704",
    courseTitle: "Advanced Machine Learning Systems: Foundations to Production Orchestration",
    credits: "4.0 ECTS Units",
    term: "Autumn 2026",
    issuedDate: "2026-02-14",
    grade: "Pass with High Distinction (Grade A+)",
    status: "verified",
    sha256Digest: "4a7f21b89e830f6a5b28d098e72c5a14d86b72e01f543169d2d0b5ef871b9c3a",
    registrarSignature: "Dr. Ananya Sharma, Chair / Academic Registrar Registry Key #884",
    issuingBoard: "School of Computing & Advanced Engineering Curriculum Board"
  },
  "demo": {
    id: "YUKTA-2026-CS704-8842",
    studentName: "Dhruv M. Varma",
    studentId: "STU-882104",
    courseCode: "CS-704",
    courseTitle: "Advanced Machine Learning Systems: Foundations to Production Orchestration",
    credits: "4.0 ECTS Units",
    term: "Autumn 2026",
    issuedDate: "2026-02-14",
    grade: "Pass with High Distinction (Grade A+)",
    status: "verified",
    sha256Digest: "4a7f21b89e830f6a5b28d098e72c5a14d86b72e01f543169d2d0b5ef871b9c3a",
    registrarSignature: "Dr. Ananya Sharma, Chair / Academic Registrar Registry Key #884",
    issuingBoard: "School of Computing & Advanced Engineering Curriculum Board"
  }
}

export const VerifyCertificate: React.FC = () => {
  const { certificateId } = useParams<{ certificateId?: string }>()
  const initialInput = certificateId || "YUKTA-2026-CS704-8842"
  
  const [certInput, setCertInput] = useState(initialInput)
  const [activeRecord, setActiveRecord] = useState<CertificateRecord | null>(
    SAMPLE_DATABASE[initialInput] || null
  )
  const [hasSearched, setHasSearched] = useState(Boolean(initialInput))
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setTimeout(() => {
      const trimmed = certInput.trim()
      const found = SAMPLE_DATABASE[trimmed] || null
      setActiveRecord(found)
      setHasSearched(true)
      setIsVerifying(false)
    }, 350)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-on-surface font-sans selection:bg-primary/10 selection:text-primary">
      <Header />

      {/* Institutional Banner Header */}
      <header className="border-b border-black/[0.04] bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                ACADEMIC REGISTRY &amp; TRANSCRIPT VERIFICATION
              </span>
              <AIAssistChip label="Cryptographic Ledger Active" size="sm" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight">
              Cryptographic Credential Verification
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">
              Inspect and validate official completion certificates, European Credit Transfer units, and lab benchmark transcripts issued by Yukta EduOS.
            </p>
          </div>
        </div>
      </header>

      {/* Main Verification Workflow */}
      <main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-8">
        {/* Verification Query Card */}
        <section aria-labelledby="lookup-heading" className="p-6 md:p-8 border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Search className="w-4 h-4" />
              </span>
              <h2 id="lookup-heading" className="text-lg md:text-xl font-bold text-on-surface">
                Query Credential Database
              </h2>
            </div>
            <span className="text-xs text-on-surface-variant font-mono uppercase tracking-wider px-2.5 py-1 bg-[#eeeef0] rounded-lg">
              ECTS 2026 SPEC
            </span>
          </div>

          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                required
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="Certificate Identifier (e.g. YUKTA-2026-CS704-8842)"
                className="w-full h-12 px-4 bg-white border border-black/[0.08] rounded-xl text-sm font-mono text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all"
              />
            </div>
            <Button
              disabled={isVerifying}
              type="submit"
              variant="primary"
              className="shrink-0 h-12 px-6"
            >
              {isVerifying ? "Verifying..." : "Verify Registry"}
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-on-surface-variant pt-2 border-t border-black/[0.04]">
            <span className="text-outline">Quick Sample Query:</span>
            <button
              type="button"
              onClick={() => {
                setCertInput("YUKTA-2026-CS704-8842")
                setActiveRecord(SAMPLE_DATABASE["YUKTA-2026-CS704-8842"])
                setHasSearched(true)
              }}
              className="text-primary font-bold hover:underline cursor-pointer bg-primary/5 px-2.5 py-1 rounded-md"
            >
              YUKTA-2026-CS704-8842
            </button>
            <span className="text-outline hidden sm:inline">•</span>
            <span className="text-outline hidden sm:inline">Standard: ECTS 2026 Transcript Verification</span>
          </div>
        </section>

        {/* Verification Result Display */}
        {hasSearched && (
          activeRecord ? (
            <article className="border border-black/[0.04] bg-white rounded-3xl p-6 md:p-10 shadow-[0px_10px_36px_rgba(0,105,79,0.08)] space-y-8">
              {/* Credential Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-black/[0.04] pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary px-3 py-1 bg-[#f0fdf4] border border-primary/20 rounded-full">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      STATUS: OFFICIAL &amp; VERIFIED
                    </span>
                    <span className="text-xs text-on-surface-variant font-mono bg-[#eeeef0] px-2.5 py-1 rounded-lg">
                      {activeRecord.id}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
                    Official Degree Credential Record
                  </h3>
                  <div className="text-xs md:text-sm text-on-surface-variant">
                    {activeRecord.issuingBoard}
                  </div>
                </div>

                <div className="shrink-0 font-mono text-xs text-on-surface-variant border border-black/[0.06] bg-[#f8f9fa] p-4 rounded-2xl space-y-1">
                  <div>Issued Date: <strong className="text-on-surface">{activeRecord.issuedDate}</strong></div>
                  <div>Record State: <strong className="text-primary font-bold">Immutable Ledger</strong></div>
                </div>
              </div>

              {/* Credential Data Ledger */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-5 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-1.5">
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Student Scholar
                  </div>
                  <div className="text-base font-bold text-on-surface">{activeRecord.studentName}</div>
                  <div className="font-mono text-xs text-primary font-semibold">{activeRecord.studentId}</div>
                </div>

                <div className="p-5 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-1.5">
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Accredited Academic Units
                  </div>
                  <div className="text-base font-bold text-primary font-mono">{activeRecord.credits}</div>
                  <div className="text-xs text-on-surface-variant">Cohort Term: {activeRecord.term}</div>
                </div>

                <div className="p-5 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2 md:col-span-2">
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Course Specification
                  </div>
                  <div className="font-bold text-on-surface text-base">
                    <span className="font-mono text-primary mr-2 px-2 py-0.5 bg-primary/10 rounded-md text-xs">{activeRecord.courseCode}</span>
                    {activeRecord.courseTitle}
                  </div>
                  <div className="text-xs text-on-surface-variant pt-1 border-t border-black/[0.04]">
                    Graduation Standing: <strong className="text-on-surface font-semibold">{activeRecord.grade}</strong>
                  </div>
                </div>
              </div>

              {/* Cryptographic Proof Strip */}
              <div className="p-6 border border-primary/20 bg-[#f0fdf4] rounded-2xl space-y-2.5 text-xs">
                <div className="flex items-center gap-2 font-bold text-on-surface uppercase tracking-wider">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Cryptographic Integrity Verification</span>
                </div>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="break-all leading-relaxed">
                    <span className="text-on-surface-variant">SHA-256 Transcript Hash: </span>
                    <span className="text-on-surface font-semibold bg-white/70 px-1.5 py-0.5 rounded border border-black/[0.04]">{activeRecord.sha256Digest}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant">Registrar Signature Authority: </span>
                    <span className="text-primary font-semibold">{activeRecord.registrarSignature}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Action Cluster */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Link to="/courses/cs-704">
                    <Button variant="primary" size="md">
                      Inspect Verified Course Syllabus <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="secondary" size="md">
                      Accreditation Standards
                    </Button>
                  </Link>
                </div>
                <span className="text-xs font-mono text-outline">
                  Issued by Yukta Academic Registrar
                </span>
              </div>
            </article>
          ) : (
            <div className="p-8 border border-error/20 bg-error/5 rounded-3xl text-center space-y-3">
              <div className="text-xl font-bold text-error">Record Not Found</div>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                No official academic transcript matches the identifier <strong className="font-mono text-on-surface">{certInput}</strong>. Verify the ID printed on your physical diploma or contact the registrar office.
              </p>
            </div>
          )
        )}
      </main>
    </div>
  )
}

