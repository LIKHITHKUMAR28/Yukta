import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { AIAssistChip } from "../../components/ui/AIAssistChip"
import { Button } from "../../components/ui/Button"
import { Search } from "lucide-react"

interface FacultyMember {
  id: string
  name: string
  title: string
  department: string
  office: string
  officeHours: string
  researchFocus: string
  recentPaper: string
  activeCourses: { code: string; title: string; id: string }[]
  initials: string
  imageUrl: string
}

const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Dr. Ananya Sharma, Ph.D.",
    title: "Director, Distributed Intelligence Laboratory",
    department: "Distributed Systems & Machine Learning",
    office: "Hall of Computing, Suite 412",
    officeHours: "Tuesdays 16:00 – 18:00 IST",
    researchFocus: "Memory-bound attention kernels, FlashAttention scheduling, and multi-node InfiniBand collective protocols.",
    recentPaper: "Sharma et al. (2024). 'Low-Latency Attention Scheduling for Distributed Workloads'. JMLR.",
    activeCourses: [
      { code: "CS-704", title: "Advanced Machine Learning Systems", id: "cs-704" }
    ],
    initials: "AS",
    imageUrl: "/images/faculty/sterling.jpg"
  },
  {
    id: "fac-2",
    name: "Dr. Sunita Rao, Ph.D.",
    title: "Lead Researcher, Model Alignment & Safety",
    department: "Formal Verification & Security",
    office: "Turing Wing, Room 204",
    officeHours: "Wednesdays 14:00 – 16:00 IST",
    researchFocus: "Direct Preference Optimization (DPO), constitutional feedback rules, and automated benchmark decontamination.",
    recentPaper: "Rao & Venkataraman (2024). 'Convergence Guarantees for Direct Preference Optimization with Noisy Labels'. NeurIPS.",
    activeCourses: [
      { code: "AI-715", title: "High-Throughput Inference Systems", id: "ai-715" }
    ],
    initials: "SR",
    imageUrl: "/images/faculty/vane.jpg"
  },
  {
    id: "fac-3",
    name: "Vikram Malhotra, M.S.",
    title: "Cluster Systems Architect & Senior Fellow",
    department: "Distributed Systems & Machine Learning",
    office: "HPC Supercomputing Facility, Bay 2",
    officeHours: "Mondays & Thursdays 10:00 – 12:00 IST",
    researchFocus: "NVLink and NVSwitch interconnect partitioning, asynchronous gradient accumulation, and kernel failure recovery.",
    recentPaper: "Malhotra et al. (2023). 'Fault-Tolerant Collective Topologies for Trillion-Parameter Training Clusters'. SOSP.",
    activeCourses: [
      { code: "CS-602", title: "Distributed Operating Systems", id: "cs-602" },
      { code: "CS-501", title: "Systems Foundations for HPC", id: "cs-501" }
    ],
    initials: "VM",
    imageUrl: "/images/faculty/thorne.jpg"
  },
  {
    id: "fac-4",
    name: "Prof. Jayant Venkataraman, Ph.D.",
    title: "Chair, Formal Methods & Model Verification",
    department: "Formal Verification & Security",
    office: "Mathematics Institute, Hall 3",
    officeHours: "Fridays 11:00 – 13:00 IST",
    researchFocus: "Empirical safety verification, adversarial perturbation bounds, and automated red-teaming harness architecture.",
    recentPaper: "Venkataraman, J. (2024). 'Provable Bound Analysis for Neural Network Activation Calibration'. IEEE Trans. Information Theory.",
    activeCourses: [
      { code: "SEC-620", title: "Formal Verification of Neural Models", id: "sec-620" }
    ],
    initials: "JV",
    imageUrl: "/images/faculty/miller.jpg"
  },
  {
    id: "fac-5",
    name: "Prof. Meera Subramanian, Ph.D.",
    title: "Principal Investigator, Convex Systems Lab",
    department: "Applied Mathematics",
    office: "Newton Building, Room 108",
    officeHours: "Thursdays 15:00 – 17:00 IST",
    researchFocus: "Stochastic proximal optimization algorithms, Riemannian manifolds, and variance-reduced gradient dynamics.",
    recentPaper: "Subramanian, M. (2023). 'High-Dimensional Convex Duality in Deep Matrix Factorizations'. SIAM Optimization.",
    activeCourses: [
      { code: "MTH-612", title: "Numerical Convex Optimization", id: "mth-612" }
    ],
    initials: "MS",
    imageUrl: "/images/faculty/rodriguez.jpg"
  }
]

export const Mentors: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const departments = ["All", "Distributed Systems & Machine Learning", "Formal Verification & Security", "Applied Mathematics"]

  const filteredFaculty = FACULTY_MEMBERS.filter((f) => {
    const matchesDept = selectedDept === "All" || f.department === selectedDept
    const matchesSearch =
      searchQuery === "" ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.researchFocus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.department.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDept && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed font-sans">
      <Header />

      {/* Directory Header */}
      <header className="border-b border-black/[0.04] bg-[#f8f9fa]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-primary px-3 py-1 border border-primary/20 bg-primary/10 rounded-xl">
                ACADEMIC FACULTY DIRECTORY
              </span>
              <AIAssistChip label="Office Hours AI Matching Active" size="sm" />
            </div>
            <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-on-surface tracking-tight">
              Research Faculty &amp; Laboratory Staff
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              Principal investigators, lab chairs, and teaching fellows supervising accredited graduate seminars and laboratory compute sessions.
            </p>
          </div>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.04] pb-6">
          {/* Pill Search Field */}
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name, topic, or paper..."
              className="w-full h-12 pl-12 pr-4 bg-white border border-black/[0.08] rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all"
            />
          </div>

          {/* Department Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mr-1">
              Division:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedDept === dept
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-on-surface-variant hover:bg-[#eeeef0] border border-black/[0.04]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Dossiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFaculty.map((member) => (
            <article
              key={member.id}
              className="p-6 md:p-8 border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_36px_rgba(0,105,79,0.08)] transition-all space-y-5"
            >
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm shrink-0 bg-neutral-100">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-on-surface">
                    {member.name}
                  </h2>
                  <div className="text-xs text-primary font-bold">
                    {member.title}
                  </div>
                  <div className="font-mono text-xs text-on-surface-variant">
                    {member.department}
                  </div>
                  <div className="text-xs text-on-surface-variant font-mono pt-1">
                    Office: <strong className="text-on-surface">{member.office}</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="uppercase tracking-wider font-bold text-on-surface mb-1">
                    Research Specialization
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">
                    {member.researchFocus}
                  </p>
                </div>

                <div className="p-3.5 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl">
                  <span className="font-bold text-on-surface">Recent Monograph: </span>
                  <span className="text-on-surface-variant italic">{member.recentPaper}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-on-surface-variant font-mono">
                  Office Hours: <strong className="text-on-surface font-semibold">{member.officeHours}</strong>
                </div>

                <div className="flex items-center gap-2">
                  {member.activeCourses.map((c) => (
                    <Link
                      key={c.code}
                      to={`/courses/${c.id}`}
                    >
                      <Button variant="primary" size="sm" className="font-mono text-xs py-2 px-3.5">
                        {c.code} Syllabus →
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
