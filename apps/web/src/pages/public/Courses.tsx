import React, { useState, useMemo } from "react"
import { Header } from "../../components/Header"
import { CourseCard } from "../../components/ui/CourseCard"
import { AIAssistChip } from "../../components/ui/AIAssistChip"
import { Button } from "../../components/ui/Button"
import { Search } from "lucide-react"

interface CourseItem {
  id: string
  code: string
  title: string
  department: string
  level: "Graduate" | "Upper Undergraduate" | "Foundational"
  credits: string
  duration: string
  term: string
  instructor: string
  clusterSpec: string
  description: string
  thumbnailUrl: string
  progressPercent: number
  progressLabel: string
}

const COURSES_DATA: CourseItem[] = [
  {
    id: "cs-704",
    code: "CS-704",
    title: "Advanced Machine Learning Systems: Foundations to Production Orchestration",
    department: "Distributed Systems & Machine Learning",
    level: "Graduate",
    credits: "4.0 ECTS",
    duration: "14 Weeks",
    term: "Autumn 2026",
    instructor: "Dr. Ananya Sharma",
    clusterSpec: "80 H100 GPU Hours • PyTorch 2.5",
    description: "Deep dive into attention memory complexity, multi-node ZeRO parameter sharding, custom Triton kernels, and PagedAttention serving architectures.",
    thumbnailUrl: "/images/neural_compute_lab.jpg",
    progressPercent: 68,
    progressLabel: "Week 6 of 14"
  },
  {
    id: "cs-602",
    code: "CS-602",
    title: "Distributed Operating Systems & Collective Interconnect Topologies",
    department: "Distributed Systems & Machine Learning",
    level: "Upper Undergraduate",
    credits: "3.5 ECTS",
    duration: "12 Weeks",
    term: "Autumn 2026",
    instructor: "Vikram Malhotra",
    clusterSpec: "InfiniBand 3.2Tbps • Ring-AllReduce",
    description: "Inter-node communication topologies, distributed consensus protocols, clock synchronizations, and cluster fault tolerance simulations.",
    thumbnailUrl: "/images/distributed_systems_lab.jpg",
    progressPercent: 42,
    progressLabel: "Week 4 of 12"
  },
  {
    id: "ai-715",
    code: "AI-715",
    title: "High-Throughput Inference Architecture & Memory Budgets",
    department: "Distributed Systems & Machine Learning",
    level: "Graduate",
    credits: "4.0 ECTS",
    duration: "14 Weeks",
    term: "Autumn 2026",
    instructor: "Dr. Sunita Rao",
    clusterSpec: "vLLM Engine • TensorRT-LLM",
    description: "Continuous batching schedulers, speculative decoding mathematical acceptance proofs, and KV-cache virtual memory management under strict SLAs.",
    thumbnailUrl: "/images/quantum_cryptography_lab.jpg",
    progressPercent: 55,
    progressLabel: "Week 5 of 14"
  },
  {
    id: "sec-620",
    code: "SEC-620",
    title: "Formal Verification & Empirical Safety Alignment of Neural Models",
    department: "Formal Verification & Security",
    level: "Graduate",
    credits: "4.0 ECTS",
    duration: "14 Weeks",
    term: "Autumn 2026",
    instructor: "Prof. Jayant Venkataraman",
    clusterSpec: "Automated Red-Teaming Harness",
    description: "Preference optimization formulations (DPO / KTO), constitutional AI rule sets, automated jailbreak surfaces, and benchmark contamination audits.",
    thumbnailUrl: "/images/quantum_cryptography_lab.jpg",
    progressPercent: 30,
    progressLabel: "Week 3 of 14"
  },
  {
    id: "mth-612",
    code: "MTH-612",
    title: "Numerical Convex Optimization & High-Dimensional Geometry",
    department: "Applied Mathematics",
    level: "Upper Undergraduate",
    credits: "3.0 ECTS",
    duration: "12 Weeks",
    term: "Spring 2027",
    instructor: "Prof. Meera Subramanian",
    clusterSpec: "CUDA BLAS Kernels • Matrix Decompositions",
    description: "First- and second-order optimization methods, duality theory, proximal algorithms, and stochastic gradient variance reduction techniques.",
    thumbnailUrl: "/images/neural_compute_lab.jpg",
    progressPercent: 20,
    progressLabel: "Week 2 of 12"
  },
  {
    id: "cs-501",
    code: "CS-501",
    title: "Systems Foundations for High-Performance Computing",
    department: "Distributed Systems & Machine Learning",
    level: "Foundational",
    credits: "3.0 ECTS",
    duration: "10 Weeks",
    term: "Autumn 2026",
    instructor: "Vikram Malhotra",
    clusterSpec: "Linux Kernel Telemetry • C++20",
    description: "Virtual memory layouts, CPU cache hierarchies, POSIX threads, asynchronous IO events, and baseline C++ systems profiling.",
    thumbnailUrl: "/images/distributed_systems_lab.jpg",
    progressPercent: 85,
    progressLabel: "Week 9 of 10"
  }
]

export const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")

  const departments = ["All", "Distributed Systems & Machine Learning", "Formal Verification & Security", "Applied Mathematics"]
  const levels = ["All", "Graduate", "Upper Undergraduate", "Foundational"]

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDept = selectedDepartment === "All" || course.department === selectedDepartment
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel

      return matchesSearch && matchesDept && matchesLevel
    })
  }, [searchQuery, selectedDepartment, selectedLevel])

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Header />

      {/* Catalog Command Header */}
      <section className="border-b border-black/[0.04] bg-[#f8f9fa]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-14 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-primary px-3 py-1 border border-primary/20 bg-primary-fixed/20 rounded-xl">
              ACADEMIC COURSE CATALOG
            </span>
            <span className="font-mono text-xs text-on-surface-variant bg-[#eeeef0] px-3 py-1 rounded-xl">
              CURRICULUM REGISTRY • AUTUMN 2026 / SPRING 2027
            </span>
            <AIAssistChip label="AI Syllabus Search Enabled" />
          </div>

          <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-on-surface tracking-tight">
            Accredited Laboratory Curricula
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            All course curricula are audited by the University Curriculum Board, mapped to ECTS credit standards, and backed by individual multi-node NVIDIA H100 supercomputing cluster quotas.
          </p>

          {/* Minimalist Pill Search Bar */}
          <div className="pt-4 max-w-3xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search curricula by code, topic, or instructor (e.g. 'CS-704', 'Triton', 'Sharma')..."
                className="w-full h-12 pl-12 pr-4 bg-white border border-black/[0.08] rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all"
              />
            </div>
            {(searchQuery || selectedDepartment !== "All" || selectedLevel !== "All") && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => { setSearchQuery(""); setSelectedDepartment("All"); setSelectedLevel("All"); }}
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Catalog Main Layout */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Column: Filter Ledger (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-white border border-black/[0.04] rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-6">
              <div>
                <h2 className="text-headline-sm font-bold text-on-surface text-base uppercase tracking-wider font-label-md">
                  Curriculum Facets
                </h2>
                <div className="text-xs text-on-surface-variant mt-1 font-mono">
                  Showing {filteredCourses.length} of {COURSES_DATA.length} specifications
                </div>
              </div>

              {/* Department Selector */}
              <div className="space-y-2">
                <label className="text-label-md font-semibold text-on-surface uppercase tracking-wider block">
                  Academic Division
                </label>
                <div className="space-y-1.5">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => setSelectedDepartment(dept)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedDepartment === dept
                          ? "bg-primary text-white font-semibold shadow-sm"
                          : "text-on-surface-variant hover:bg-[#eeeef0]"
                      }`}
                    >
                      <span className="truncate">{dept}</span>
                      {selectedDepartment === dept && <span className="font-mono text-xs">●</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Degree Level Selector */}
              <div className="space-y-2 pt-4 border-t border-black/[0.04]">
                <label className="text-label-md font-semibold text-on-surface uppercase tracking-wider block">
                  Matriculation Level
                </label>
                <div className="space-y-1.5">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(lvl)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedLevel === lvl
                          ? "bg-primary text-white font-semibold shadow-sm"
                          : "text-on-surface-variant hover:bg-[#eeeef0]"
                      }`}
                    >
                      <span>{lvl}</span>
                      {selectedLevel === lvl && <span className="font-mono text-xs">●</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Institutional Assurance */}
              <div className="pt-4 border-t border-black/[0.04] text-xs text-on-surface-variant space-y-2">
                <div className="font-bold text-on-surface">Curriculum Governance Guarantee</div>
                <p className="leading-relaxed">
                  Every syllabus provides full reading lists, lecture breakdowns, and repository templates under open academic licensing.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Column: Course Specifications Grid (8 cols) */}
          <section aria-label="Course list" className="lg:col-span-8">
            {filteredCourses.length === 0 ? (
              <div className="p-12 border border-black/[0.04] bg-white rounded-3xl text-center space-y-4 shadow-[0px_4px_24px_rgba(0,0,0,0.04)]">
                <div className="font-mono text-sm text-on-surface-variant">No course specifications match your query.</div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedDepartment("All")
                    setSelectedLevel("All")
                  }}
                >
                  Reset Filter Parameters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    code={course.code}
                    title={course.title}
                    department={course.department}
                    level={course.level}
                    term={course.term}
                    credits={course.credits}
                    duration={course.duration}
                    instructor={course.instructor}
                    spec={course.clusterSpec}
                    thumbnailUrl={course.thumbnailUrl}
                    progressPercent={course.progressPercent}
                    progressLabel={course.progressLabel}
                  />
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  )
}
