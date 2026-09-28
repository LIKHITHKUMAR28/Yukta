import React, { useState } from "react"
import { Header } from "../../components/Header"
import { AIAssistChip } from "../../components/ui/AIAssistChip"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"

export const Contact: React.FC = () => {
  const [department, setDepartment] = useState("admissions")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [affiliation, setAffiliation] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 600)
  }

  const officeDirectory = [
    {
      role: "Academic Registrar & Degree Credentialing",
      email: "registrar@yukta.edu",
      office: "Hall of Computing, Suite 104",
      hours: "Mon–Thu 09:00–17:00 IST"
    },
    {
      role: "Supercomputing Cluster Administration",
      email: "cluster-ops@yukta.edu",
      office: "Distributed Systems Lab 4B",
      hours: "Mon–Fri 09:00–18:00 IST"
    },
    {
      role: "Admissions & University Transfer Desk",
      email: "admissions@yukta.edu",
      office: "Administration Wing, Room 210",
      hours: "Mon–Fri 10:00–17:00 IST"
    },
    {
      role: "Institutional Research Partnerships",
      email: "research-grants@yukta.edu",
      office: "Dean of Engineering, Tower 3",
      hours: "By Faculty Appointment"
    }
  ]

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed font-sans">
      <Header />

      {/* Directory Header */}
      <header className="border-b border-black/[0.04] bg-[#f8f9fa]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-primary px-3 py-1 border border-primary/20 bg-primary/10 rounded-xl">
                DEPARTMENTAL DIRECTORY
              </span>
              <AIAssistChip label="Automated Routing AI Active" size="sm" />
            </div>
            <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-on-surface tracking-tight">
              Academic Registrar &amp; Faculty Contacts
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              Inquiries regarding course accreditation, transfer transcripts, cluster compute allocation, or institutional research grants.
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid: Directory Ledger & Inquiry Form */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Office Directory Ledger (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border border-black/[0.04] bg-white p-8 md:p-10 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-6">
              <div className="border-b border-black/[0.04] pb-4">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Administrative Offices</span>
                <h2 className="text-xl font-bold text-on-surface mt-1">
                  Department Locations &amp; Hours
                </h2>
              </div>

              <div className="space-y-4">
                {officeDirectory.map((item, idx) => (
                  <div key={idx} className="p-5 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2 transition-all hover:bg-neutral-50">
                    <div className="text-sm font-bold text-on-surface">
                      {item.role}
                    </div>
                    <div className="font-mono text-xs text-primary font-bold">
                      {item.email}
                    </div>
                    <div className="text-xs text-on-surface-variant flex flex-wrap gap-x-4 pt-1">
                      <span>Location: <strong className="text-on-surface font-semibold">{item.office}</strong></span>
                      <span>Hours: <strong className="text-on-surface font-semibold">{item.hours}</strong></span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 border border-black/[0.04] bg-[#eeeef0] rounded-2xl text-xs text-on-surface-variant space-y-1">
                <div className="font-bold text-on-surface uppercase tracking-wider">Official Postal Address</div>
                <p className="leading-relaxed">School of Computing &amp; Advanced Engineering, Yukta Academic Consortium, Tech Park Road, Whitefield, Bengaluru, Karnataka 560066, India.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Inquiry Form (6 cols) */}
          <div className="lg:col-span-6">
            <div className="border border-black/[0.04] bg-white p-8 md:p-10 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-6">
              <div className="border-b border-black/[0.04] pb-4">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Formal Inquiries</span>
                <h2 className="text-xl font-bold text-on-surface mt-1">
                  Transmit Academic Query
                </h2>
              </div>

              {submitted ? (
                <div className="p-8 border border-primary/20 bg-secondary-container/20 rounded-3xl shadow-sm space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white mx-auto flex items-center justify-center font-bold text-lg shadow-sm">
                    ✓
                  </div>
                  <div className="text-lg font-bold text-primary">Inquiry Transmitted Successfully</div>
                  <p className="text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    Your inquiry has been assigned reference ID <strong className="font-mono text-on-surface">REQ-2026-0814</strong>. The departmental coordinator will respond within 24 to 48 business hours.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setSubmitted(false)
                      setName("")
                      setEmail("")
                      setMessage("")
                      setAffiliation("")
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs text-on-surface uppercase tracking-wider font-bold">
                      Target Academic Division
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full h-12 border border-black/[0.08] px-4 rounded-xl bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all cursor-pointer"
                    >
                      <option value="admissions">Admissions &amp; Degree Cohort Registration</option>
                      <option value="registrar">Academic Registrar (ECTS Transcripts &amp; Transfers)</option>
                      <option value="cluster">High-Performance Computing Cluster Support</option>
                      <option value="partnerships">University Institutional Partnerships</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. / Prof. / Student Name"
                    />

                    <Input
                      label="Institutional Email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@university.edu"
                    />
                  </div>

                  <Input
                    label="University or Organization Affiliation"
                    type="text"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    placeholder="Department of Computer Science, University of..."
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs text-on-surface uppercase tracking-wider font-bold">
                      Inquiry Scope &amp; Details
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify your inquiry, course code, or compute allocation request..."
                      className="w-full border border-black/[0.08] p-4 rounded-2xl bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all leading-relaxed"
                    />
                  </div>

                  <Button
                    disabled={loading}
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full py-3.5 rounded-xl shadow-sm text-sm"
                  >
                    {loading ? "Transmitting Query..." : "Submit Official Query"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
