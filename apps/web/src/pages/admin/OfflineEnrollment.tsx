import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"

interface EnrolledPerson {
  id: string
  name: string
  email: string
  role: "Student" | "Faculty Fellow"
  institution: string
  course: string
  track: "Accredited ECTS" | "Open Audit"
  registeredAt: string
}

const INITIAL_RECORDS: EnrolledPerson[] = [
  { id: "STU-882104", name: "Dhruv Varma", email: "dhruv.varma@university.edu", role: "Student", institution: "IIT Bombay", course: "CS-704", track: "Accredited ECTS", registeredAt: "2026-09-20" },
  { id: "FAC-901240", name: "Dr. Ananya Sharma", email: "ananya.sharma@yuktaedu.os", role: "Faculty Fellow", institution: "IISc Bangalore", course: "CS-704", track: "Accredited ECTS", registeredAt: "2026-09-18" },
  { id: "STU-882109", name: "Priya Sharma", email: "priya.sharma@university.edu", role: "Student", institution: "IIT Delhi", course: "CS-704", track: "Accredited ECTS", registeredAt: "2026-09-15" },
  { id: "STU-882115", name: "Rohan Kulkarni", email: "rohan.kulkarni@university.edu", role: "Student", institution: "IIT Madras", course: "SEC-620", track: "Accredited ECTS", registeredAt: "2026-09-14" },
  { id: "FAC-901245", name: "Dr. Vikram Malhotra", email: "vikram.malhotra@yuktaedu.os", role: "Faculty Fellow", institution: "IIT Kanpur", course: "SEC-620", track: "Accredited ECTS", registeredAt: "2026-09-12" },
  { id: "STU-882120", name: "Kavya Patel", email: "kavya.patel@university.edu", role: "Student", institution: "BITS Pilani", course: "MTH-801", track: "Open Audit", registeredAt: "2026-09-10" }
]

export const OfflineEnrollment: React.FC = () => {
  const [records, setRecords] = useState<EnrolledPerson[]>(INITIAL_RECORDS)
  const [role, setRole] = useState<"Student" | "Faculty Fellow">("Student")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [institution, setInstitution] = useState("")
  const [course, setCourse] = useState("CS-704")
  const [track, setTrack] = useState<"Accredited ECTS" | "Open Audit">("Accredited ECTS")
  const [voucherCode, setVoucherCode] = useState("")
  const [successNotice, setSuccessNotice] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    const prefix = role === "Student" ? "STU" : "FAC"
    const newRecord: EnrolledPerson = {
      id: `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`,
      name: name.trim(),
      email: email.trim(),
      role,
      institution: institution.trim() || "Independent Scholar",
      course,
      track,
      registeredAt: new Date().toISOString().split("T")[0]
    }

    setRecords([newRecord, ...records])
    setSuccessNotice(`${role} ${newRecord.name} successfully matriculated with ID ${newRecord.id} and provisioned for ${course}.`)
    setName("")
    setEmail("")
    setInstitution("")
    setVoucherCode("")
  }

  const filteredRecords = records.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.course.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#111827] flex flex-col justify-between font-sans selection:bg-[#00694f] selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        
        {/* Header Breadcrumb Card */}
        <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Link to="/admin/dashboard" className="text-xs font-semibold text-[#00694f] hover:underline flex items-center gap-1">
                  <span>← Admin Console</span>
                </Link>
                <span className="text-gray-300">/</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  REGISTRAR MATRICULATION DESK
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Scholar &amp; Faculty Manual Matriculation
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
                Direct registrar enrollment, departmental voucher redemption, and supercomputing cluster tenancy provisioning for students and teaching fellows.
              </p>
            </div>

            <Link
              to="/admin/dashboard"
              className="py-2.5 px-4 bg-[#eeeef0] hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium transition-all self-start sm:self-auto"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>

        {/* Success Notice Banner */}
        {successNotice && (
          <div role="status" className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-[#00694f] font-semibold flex justify-between items-center shadow-xs animate-fade-in">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#00694f] text-white flex items-center justify-center text-[11px] font-bold">✓</span>
              <span>{successNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setSuccessNotice(null)}
              className="text-xs text-gray-400 hover:text-gray-700 font-mono cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Two-Column Grid: Form & Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Enrollment Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
            <div className="border-b border-black/[0.04] pb-4">
              <h2 className="text-lg font-bold text-[#111827] tracking-tight">
                Enroll New Candidate
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Issue official matriculation clearance and provision HPC cluster access.
              </p>
            </div>

            <form onSubmit={handleEnroll} className="space-y-4">
              {/* Role Selection Toggle */}
              <div className="space-y-1">
                <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Academic Role Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("Student")}
                    className={`py-2.5 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                      role === "Student"
                        ? "bg-[#00694f] text-white border-[#00694f] shadow-xs font-semibold"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Student Candidate
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("Faculty Fellow")}
                    className={`py-2.5 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                      role === "Faculty Fellow"
                        ? "bg-[#00694f] text-white border-[#00694f] shadow-xs font-semibold"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Faculty Fellow
                  </button>
                </div>
              </div>

              <Input
                label="Legal Full Name"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Candidate Legal Name"
              />

              <Input
                label="Institutional University Email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scholar@university.edu"
              />

              <Input
                label="Home Academic Institution / Department"
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. Stanford University, ETH Zürich"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Curriculum Code
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-3.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#00694f] cursor-pointer"
                  >
                    <option value="CS-704">CS-704 (Distributed GPU)</option>
                    <option value="SEC-620">SEC-620 (Formal Verification)</option>
                    <option value="MTH-801">MTH-801 (Nonlinear PDEs)</option>
                    <option value="AI-715">AI-715 (Multimodal Architectures)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Enrollment Track
                  </label>
                  <select
                    value={track}
                    onChange={(e) => setTrack(e.target.value as "Accredited ECTS" | "Open Audit")}
                    className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-3.5 text-xs text-[#111827] focus:outline-none focus:border-[#00694f] cursor-pointer"
                  >
                    <option value="Accredited ECTS">Accredited ECTS</option>
                    <option value="Open Audit">Open Audit ($0)</option>
                  </select>
                </div>
              </div>

              <Input
                label="Department Voucher / Purchase Order (Optional)"
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="e.g. VOUCHER-DEPT-2026"
              />

              <button
                type="submit"
                className="w-full py-3 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer pt-3"
              >
                <span>Matriculate &amp; Provision Tenancy</span>
                <span>→</span>
              </button>
            </form>
          </div>

          {/* Registration Ledger Table (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.04] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#111827] tracking-tight">
                  Matriculation Ledger ({records.length})
                </h3>
                <p className="text-xs text-gray-500">Autumn 2026 Academic Term Records</p>
              </div>
              <div className="w-full sm:w-56">
                <input
                  type="text"
                  placeholder="Filter records..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-gray-200 text-xs text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#00694f]"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredRecords.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-gray-100/60 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#00694f] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-[11px]">
                        {r.id}
                      </span>
                      <span className="font-bold text-gray-900 text-sm">{r.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                        r.role === "Student" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                      }`}>
                        {r.role}
                      </span>
                    </div>
                    <div className="text-gray-500 text-[11px]">
                      {r.email} • <span className="text-gray-700 font-medium">{r.institution}</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end gap-1 shrink-0">
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span className="font-bold text-[#111827]">{r.course}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-[#00694f] font-semibold">{r.track}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{r.registeredAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Registrar Academic Matriculation Protocol
      </footer>
    </div>
  )
}
