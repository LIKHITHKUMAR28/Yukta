import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../stores/auth-store"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"
import { ProgressBar } from "../../components/ui/ProgressBar"

type TrainerTab = "cohorts" | "students" | "announcements" | "backlog"

interface SupervisedCohort {
  code: string
  title: string
  term: string
  enrolled: number
  capacity: number
  pendingGrading: number
  nextSession: string
  clusterHoursUsed: string
}

interface StudentProgressRecord {
  id: string
  name: string
  matriculation: string
  course: string
  progress: number
  submissionsDone: number
  totalSubmissions: number
  gradeStanding: string
  lastActive: string
}

interface FacultyAnnouncement {
  id: string
  title: string
  course: string
  body: string
  date: string
  deliveredTo: string
}

interface PendingSubmission {
  id: string
  student: string
  matriculation: string
  course: string
  item: string
  submitted: string
  benchResult: string
}

export const TrainerDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { profile, user, signOut } = useAuthStore()

  const [activeTab, setActiveTab] = useState<TrainerTab>("cohorts")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleLogout = async () => {
    await signOut()
    navigate("/login")
  }

  // --- STATE: COHORTS ---
  const [cohorts] = useState<SupervisedCohort[]>([
    {
      code: "CS-704",
      title: "Advanced Machine Learning Systems: Foundations to Production",
      term: "Autumn 2026",
      enrolled: 34,
      capacity: 45,
      pendingGrading: 6,
      nextSession: "Seminar 4.1: Oct 15, 16:00 UTC",
      clusterHoursUsed: "420 / 600"
    },
    {
      code: "CS-602",
      title: "Distributed Operating Systems & Collective Interconnect Topologies",
      term: "Autumn 2026",
      enrolled: 42,
      capacity: 45,
      pendingGrading: 9,
      nextSession: "Lab 2 Review: Oct 16, 14:00 UTC",
      clusterHoursUsed: "380 / 500"
    }
  ])

  // --- STATE: STUDENT PROGRESS ROSTER ---
  const [studentSearch, setStudentSearch] = useState("")
  const [studentCourseFilter, setStudentCourseFilter] = useState("All")
  const [students] = useState<StudentProgressRecord[]>([
    { id: "s-1", name: "Dhruv Varma", matriculation: "STU-882104", course: "CS-704", progress: 68, submissionsDone: 4, totalSubmissions: 5, gradeStanding: "Grade A (94%)", lastActive: "2 hours ago" },
    { id: "s-2", name: "Priya Sharma", matriculation: "STU-882109", course: "CS-704", progress: 60, submissionsDone: 3, totalSubmissions: 5, gradeStanding: "Grade A- (91%)", lastActive: "5 hours ago" },
    { id: "s-3", name: "Rohan Kulkarni", matriculation: "STU-882115", course: "CS-602", progress: 42, submissionsDone: 2, totalSubmissions: 4, gradeStanding: "Grade B+ (87%)", lastActive: "1 day ago" },
    { id: "s-4", name: "Kavya Patel", matriculation: "STU-882120", course: "CS-704", progress: 50, submissionsDone: 3, totalSubmissions: 5, gradeStanding: "Grade B (84%)", lastActive: "3 hours ago" },
    { id: "s-5", name: "Arjun Nair", matriculation: "STU-882126", course: "CS-602", progress: 35, submissionsDone: 1, totalSubmissions: 4, gradeStanding: "Grade B- (80%)", lastActive: "2 days ago" }
  ])

  // --- STATE: ANNOUNCEMENTS ---
  const [announcements, setAnnouncements] = useState<FacultyAnnouncement[]>([
    {
      id: "ANC-1",
      title: "Homework 3: Triton Blocked Softmax Benchmark Guidelines",
      course: "CS-704",
      body: "Please make sure your kernels adhere to the roofline memory bandwidth constraints described in Lecture 1.3. Auto-grader benchmarks against NVIDIA H100 SXM5 partitions.",
      date: "Oct 13, 2026",
      deliveredTo: "34 Enrolled Scholars"
    },
    {
      id: "ANC-2",
      title: "Mid-Term Systems Examination Format & Logistics",
      course: "CS-704",
      body: "The upcoming proctored mid-term examination on Nov 04 will cover Units 1.1 through 2.4. You will be provided with an isolated JupyterLab terminal container.",
      date: "Oct 10, 2026",
      deliveredTo: "34 Enrolled Scholars"
    }
  ])
  const [newAncTitle, setNewAncTitle] = useState("")
  const [newAncCourse, setNewAncCourse] = useState("CS-704")
  const [newAncBody, setNewAncBody] = useState("")

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAncTitle.trim() || !newAncBody.trim()) return

    const newObj: FacultyAnnouncement = {
      id: `ANC-${Math.floor(100 + Math.random() * 900)}`,
      title: newAncTitle.trim(),
      course: newAncCourse,
      body: newAncBody.trim(),
      date: "Today, Oct 14",
      deliveredTo: newAncCourse === "All" ? "76 Enrolled Scholars" : "34 Enrolled Scholars"
    }

    setAnnouncements([newObj, ...announcements])
    setNewAncTitle("")
    setNewAncBody("")
    showToast(`Announcement published to ${newAncCourse} cohort students.`)
  }

  // --- STATE: PENDING SUBMISSIONS ---
  const [pendingSubmissions] = useState<PendingSubmission[]>([
    { id: "sub-1", student: "Dhruv Varma", matriculation: "STU-882104", course: "CS-704", item: "Lab 2: Custom Triton Attention Kernel", submitted: "4 hours ago", benchResult: "4.2 TFLOPS (100% of Roofline)" },
    { id: "sub-2", student: "Priya Sharma", matriculation: "STU-882109", course: "CS-704", item: "Lab 2: Custom Triton Attention Kernel", submitted: "6 hours ago", benchResult: "3.9 TFLOPS (92% of Roofline)" },
    { id: "sub-3", student: "Rohan Kulkarni", matriculation: "STU-882115", course: "CS-602", item: "Problem Set 1: Ring-AllReduce Bounds", submitted: "12 hours ago", benchResult: "LaTeX Mathematical Proof" },
    { id: "sub-4", student: "Kavya Patel", matriculation: "STU-882120", course: "CS-704", item: "Lab 1: KV-Cache Online Softmax", submitted: "1 day ago", benchResult: "Numerical Inaccuracy in FP16" }
  ])

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.matriculation.toLowerCase().includes(studentSearch.toLowerCase())
    const matchesCourse = studentCourseFilter === "All" || s.course === studentCourseFilter
    return matchesSearch && matchesCourse
  })

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#111827] flex flex-col justify-between font-sans selection:bg-[#00694f] selection:text-white">
      <Header />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white px-5 py-3 rounded-2xl shadow-xl border border-white/10 text-xs font-medium flex items-center gap-3 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Faculty Console */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  FACULTY &amp; COURSE DIRECTOR CONSOLE
                </span>
                <span className="font-mono text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
                  Staff ID: <strong className="text-gray-800">{user?.uid ? user.uid.slice(0, 8).toUpperCase() : "FAC-9021"}</strong>
                </span>
                <span className="font-mono text-xs text-gray-400">Autumn 2026 Academic Term</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                {profile?.displayName || "Dr. Ananya Sharma"}, Faculty Desk
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-3xl leading-relaxed">
                Distributed Intelligence Laboratory • School of Computing &amp; Advanced Engineering. Supervise accredited cohorts, inspect CI auto-grading benchmarks, publish curriculum modules, and broadcast announcements.
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/trainer/courses/new"
                className="py-2.5 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>+ Author Curriculum</span>
              </Link>
              <Link
                to="/trainer/assignments"
                className="py-2.5 px-4 bg-[#eeeef0] hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium transition-all"
              >
                CI Grading Queue
              </Link>
              <Link
                to="/trainer/live-classes"
                className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium transition-all"
              >
                Live Classes
              </Link>
              <Link
                to="/trainer/attendance"
                className="py-2.5 px-4 bg-emerald-50 border border-emerald-200 text-[#00694f] hover:bg-emerald-100 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span>📋 Attendance Roll</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="py-2.5 px-4 bg-white border border-gray-200 hover:border-red-200 hover:text-red-600 text-gray-600 rounded-xl text-xs font-medium transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Navigation Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-8 border-t border-black/[0.04] mt-8 no-scrollbar">
            {[
              { id: "cohorts", label: `Supervised Cohorts (${cohorts.length})`, icon: "🏫" },
              { id: "students", label: `Student Progress Roster (${students.length})`, icon: "👥" },
              { id: "announcements", label: `Cohort Announcements (${announcements.length})`, icon: "📢" },
              { id: "backlog", label: `Grading Queue (${pendingSubmissions.length} pending)`, icon: "✍️" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TrainerTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#00694f] text-white shadow-sm font-semibold"
                    : "bg-[#f8f9fa] text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200/50"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Top Metric Ribbons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Active Cohort Students</span>
            <div className="text-2xl font-bold text-[#00694f] font-mono">76 Scholars</div>
            <div className="text-xs text-gray-500">Across 2 Graduate Curricula</div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Lab Submissions Queue</span>
            <div className="text-2xl font-bold text-[#111827] font-mono">15 Pending</div>
            <div className="text-xs text-amber-600 font-semibold">4 ready for faculty sign-off</div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Cluster GPU Utilization</span>
            <div className="text-2xl font-bold text-[#111827] font-mono">78.4% Average</div>
            <div className="text-xs text-emerald-600 font-semibold">800 / 1,100 Hours Used</div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Next Seminar Scheduled</span>
            <div className="text-2xl font-bold text-[#111827] font-mono">Today 16:00</div>
            <div className="text-xs text-gray-500">Virtual Lab Room 4B</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: COHORT OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "cohorts" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#111827] tracking-tight">Supervised Graduate Cohorts</h2>
                  <p className="text-xs text-gray-500">Active enrollments, hardware partition utilization, and syllabus milestones.</p>
                </div>
                <Link to="/trainer/courses/new" className="text-xs font-semibold text-[#00694f] hover:underline">
                  + Author New Syllabus
                </Link>
              </div>

              <div className="space-y-6">
                {cohorts.map((c) => (
                  <article
                    key={c.code}
                    className="p-6 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-4 hover:border-gray-200 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#00694f] px-2.5 py-0.5 border border-emerald-200/60 bg-emerald-50 rounded-lg">
                            {c.code}
                          </span>
                          <span className="text-xs text-gray-500">{c.term}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#111827] tracking-tight">
                          {c.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          to="/trainer/assignments"
                          className="py-2 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm"
                        >
                          Review Submissions ({c.pendingGrading})
                        </Link>
                        <Link
                          to={`/trainer/attendance?course=${c.code}`}
                          className="py-2 px-3.5 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-[#00694f] rounded-xl text-xs font-semibold transition-all"
                        >
                          Attendance Roll
                        </Link>
                        <Link
                          to={`/courses/${c.code.toLowerCase()}`}
                          className="py-2 px-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium transition-all"
                        >
                          Public Syllabus
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-black/[0.04] text-xs font-mono">
                      <div className="p-3 bg-white rounded-xl border border-gray-200/60">
                        <span className="text-gray-400 block text-[10px] uppercase">Cohort Seats</span>
                        <strong className="text-gray-800 text-sm">{c.enrolled} / {c.capacity} Enrolled</strong>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-gray-200/60">
                        <span className="text-gray-400 block text-[10px] uppercase">Cluster GPU Hours</span>
                        <strong className="text-gray-800 text-sm">{c.clusterHoursUsed} Hours</strong>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-gray-200/60">
                        <span className="text-gray-400 block text-[10px] uppercase">Next Synchronous Class</span>
                        <strong className="text-[#00694f] text-sm">{c.nextSession}</strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: STUDENT PROGRESS ROSTER */}
        {/* ========================================================================= */}
        {activeTab === "students" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.04] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight">Per-Student &amp; Cohort Progress Directory</h2>
                <p className="text-xs text-gray-500">Track individual candidate syllabus completion, submitted benchmarks, and academic standing.</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={studentCourseFilter}
                  onChange={e => setStudentCourseFilter(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-gray-200 text-xs font-mono text-gray-800 bg-white focus:outline-none focus:border-[#00694f]"
                >
                  <option value="All">All Cohorts</option>
                  <option value="CS-704">CS-704</option>
                  <option value="CS-602">CS-602</option>
                </select>
                <input
                  type="text"
                  placeholder="Search student or ID..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="h-10 px-3.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#00694f]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-mono text-[11px]">
                    <th className="py-3 px-4 font-semibold">Scholar Name &amp; ID</th>
                    <th className="py-3 px-4 font-semibold">Course</th>
                    <th className="py-3 px-4 font-semibold">Curriculum Progress</th>
                    <th className="py-3 px-4 font-semibold">Submissions</th>
                    <th className="py-3 px-4 font-semibold">Current Standing</th>
                    <th className="py-3 px-4 font-semibold text-right">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00694f] font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-100">
                            {s.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{s.name}</div>
                            <div className="text-[11px] text-gray-400 font-mono">{s.matriculation}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-800">{s.course}</td>
                      <td className="py-3.5 px-4 w-48">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-gray-500">{s.progress}%</span>
                          </div>
                          <ProgressBar value={s.progress} variant="primary" size="sm" />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-700">
                        {s.submissionsDone} of {s.totalSubmissions} Labs
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#00694f]">{s.gradeStanding}</td>
                      <td className="py-3.5 px-4 text-right text-gray-400 font-mono text-[11px]">{s.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ANNOUNCEMENTS DISPATCHER */}
        {/* ========================================================================= */}
        {activeTab === "announcements" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Form (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
              <div className="border-b border-black/[0.04] pb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00694f]">
                  FACULTY DISPATCH
                </span>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight mt-1">
                  Broadcast Cohort Notice
                </h2>
                <p className="text-xs text-gray-500">Post urgent laboratory requirements, lecture logistics, or reading assignments.</p>
              </div>

              <form onSubmit={handlePostAnnouncement} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Target Cohort
                  </label>
                  <select
                    value={newAncCourse}
                    onChange={e => setNewAncCourse(e.target.value)}
                    className="w-full h-11 rounded-xl border border-black/[0.08] bg-white px-3.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#00694f]"
                  >
                    <option value="CS-704">CS-704: Advanced ML Systems (34 Scholars)</option>
                    <option value="CS-602">CS-602: Distributed OS (42 Scholars)</option>
                    <option value="All">All Supervised Cohorts (76 Scholars)</option>
                  </select>
                </div>

                <Input
                  label="Notice Subject / Headline"
                  required
                  value={newAncTitle}
                  onChange={e => setNewAncTitle(e.target.value)}
                  placeholder="e.g. Triton Kernel Roofline Evaluation Details"
                />

                <div className="space-y-1">
                  <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Announcement Body Text
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newAncBody}
                    onChange={e => setNewAncBody(e.target.value)}
                    placeholder="Enter full notice instructions to be displayed on student dashboards..."
                    className="w-full rounded-xl border border-black/[0.08] bg-white p-3 text-xs text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#00694f]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Publish Notice to Cohort</span>
                  <span>→</span>
                </button>
              </form>
            </div>

            {/* History Feed (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
              <div className="border-b border-black/[0.04] pb-4">
                <h3 className="text-xl font-bold text-[#111827] tracking-tight">Active Published Announcements</h3>
                <p className="text-xs text-gray-500">Live notices currently presented on scholar dashboards.</p>
              </div>

              <div className="space-y-4">
                {announcements.map(a => (
                  <div key={a.id} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="font-bold text-[#00694f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{a.course}</span>
                        <span className="text-gray-400 font-mono">{a.id}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-emerald-700 font-semibold">{a.deliveredTo}</span>
                      </div>
                      <span className="text-gray-400 font-mono text-[11px]">{a.date}</span>
                    </div>
                    <div className="font-bold text-gray-900 text-sm">{a.title}</div>
                    <p className="text-gray-600 leading-relaxed">{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: GRADING BACKLOG FEED */}
        {/* ========================================================================= */}
        {activeTab === "backlog" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight">Continuous Integration Benchmark Review Queue</h2>
                <p className="text-xs text-gray-500">Student PyTorch/Triton kernels benchmarked on cluster partitions awaiting faculty grading.</p>
              </div>
              <Link
                to="/trainer/assignments"
                className="py-2.5 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm"
              >
                Open Full Grading Ledger →
              </Link>
            </div>

            <div className="space-y-3">
              {pendingSubmissions.map(sub => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs hover:border-gray-200 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="font-bold text-[#00694f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{sub.course}</span>
                      <span className="text-gray-400">{sub.submitted}</span>
                    </div>
                    <div className="font-bold text-gray-900 text-sm">
                      {sub.student} <span className="font-mono text-gray-400 font-normal">({sub.matriculation})</span>
                    </div>
                    <div className="text-gray-600">{sub.item}</div>
                    <div className="font-mono text-[#00694f] font-semibold text-[11px] pt-0.5">
                      CI Telemetry: {sub.benchResult}
                    </div>
                  </div>

                  <Link
                    to="/trainer/assignments"
                    className="py-2 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium transition-all self-end md:self-center"
                  >
                    Grade Submission →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Faculty Academic Console Protocol
      </footer>
    </div>
  )
}
