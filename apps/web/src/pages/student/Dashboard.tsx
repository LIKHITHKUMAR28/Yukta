import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../stores/auth-store"
import { Header } from "../../components/Header"
import { ProgressBar } from "../../components/ui/ProgressBar"

type StudentTab = "courses" | "calendar" | "revision" | "bookmarks"

interface EnrolledCourse {
  id: string
  code: string
  title: string
  instructor: string
  term: string
  credits: string
  progress: number
  totalLessons: number
  completedLessons: number
  nextSession: string
  nextDeadline: string
  color: string
}

interface CalendarEvent {
  id: string
  title: string
  course: string
  type: "Lecture" | "Lab Deadline" | "Exam" | "Office Hours"
  date: string
  time: string
  location: string
}

interface RevisionTopic {
  id: string
  course: string
  title: string
  difficulty: "High" | "Medium" | "Low"
  scheduledFor: string
  completed: boolean
  subtopics: string[]
}

interface BookmarkedLesson {
  id: string
  courseId: string
  courseCode: string
  title: string
  duration: string
  instructor: string
  savedAt: string
}

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { profile, user, signOut } = useAuthStore()

  const [activeTab, setActiveTab] = useState<StudentTab>("courses")
  const [calendarFilter, setCalendarFilter] = useState<"All" | "Lecture" | "Lab Deadline" | "Exam">("All")
  const [dismissedNotice, setDismissedNotice] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate("/login")
  }

  // --- STATE: COURSES ---
  const [enrolledCourses] = useState<EnrolledCourse[]>([
    {
      id: "cs-704",
      code: "CS-704",
      title: "Advanced Machine Learning Systems: Foundations to Production",
      instructor: "Dr. Ananya Sharma",
      term: "Autumn 2026",
      credits: "4.0 ECTS",
      progress: 68,
      totalLessons: 14,
      completedLessons: 10,
      nextSession: "Seminar 4.1: Continuous Batching & PagedAttention",
      nextDeadline: "Lab 3: QLoRA Fine-Tuning (Oct 18)",
      color: "#00694f"
    },
    {
      id: "cs-602",
      code: "CS-602",
      title: "Distributed Operating Systems & Collective Interconnect Topologies",
      instructor: "Dr. Vikram Malhotra",
      term: "Autumn 2026",
      credits: "3.5 ECTS",
      progress: 42,
      totalLessons: 12,
      completedLessons: 5,
      nextSession: "Lab 2: Ring-AllReduce Latency Profiling",
      nextDeadline: "Problem Set 1: Lower Bounds Proof (Oct 22)",
      color: "#1e40af"
    }
  ])

  // --- STATE: CALENDAR ---
  const [calendarEvents] = useState<CalendarEvent[]>([
    {
      id: "EV-1",
      title: "Live Colloquium: Attention Kernel Optimization with Triton",
      course: "CS-704",
      type: "Lecture",
      date: "Oct 16, 2026",
      time: "14:00 - 15:30 IST",
      location: "Auditorium Turing / Zoom Live"
    },
    {
      id: "EV-2",
      title: "Laboratory 3 Submission Deadline: QLoRA 4-bit Kernels",
      course: "CS-704",
      type: "Lab Deadline",
      date: "Oct 18, 2026",
      time: "23:59 IST",
      location: "Yukta HPC Cluster Portal"
    },
    {
      id: "EV-3",
      title: "Office Hours: AllReduce Ring Communication Proofs",
      course: "CS-602",
      type: "Office Hours",
      date: "Oct 20, 2026",
      time: "10:00 - 11:30 IST",
      location: "Faculty Office 402 / Discord Voice"
    },
    {
      id: "EV-4",
      title: "Problem Set 1 Written Proof Due Date",
      course: "CS-602",
      type: "Lab Deadline",
      date: "Oct 22, 2026",
      time: "18:00 IST",
      location: "Assignment Portal"
    },
    {
      id: "EV-5",
      title: "Mid-Term Systems Architecture Proctored Examination",
      course: "CS-704",
      type: "Exam",
      date: "Nov 04, 2026",
      time: "14:00 - 17:00 IST",
      location: "Proctored Virtual Lab / Secure Browser"
    }
  ])

  // --- STATE: REVISION PLAN ---
  const [revisionTopics, setRevisionTopics] = useState<RevisionTopic[]>([
    {
      id: "REV-1",
      course: "CS-704",
      title: "FlashAttention Online Softmax Derivation & Tiling",
      difficulty: "High",
      scheduledFor: "Today • 45 min",
      completed: true,
      subtopics: ["SRAM vs HBM memory hierarchy", "Online softmax max-subtraction trick", "Outer loop block scheduling"]
    },
    {
      id: "REV-2",
      course: "CS-704",
      title: "RoPE & ALiBi Mathematical Coordinate Rotations",
      difficulty: "Medium",
      scheduledFor: "Tomorrow • 30 min",
      completed: false,
      subtopics: ["Complex 2D block diagonal orthogonal matrices", "Decay factors in relative position embeddings"]
    },
    {
      id: "REV-3",
      course: "CS-602",
      title: "Bisection Bandwidth & Fat-Tree Network Topologies",
      difficulty: "High",
      scheduledFor: "Oct 19 • 60 min",
      completed: false,
      subtopics: ["InfiniBand NDR 400Gb/s rails", "Clos network non-blocking routing", "Packet collision mitigation"]
    },
    {
      id: "REV-4",
      course: "CS-704",
      title: "PagedAttention & vLLM KV-Cache Memory Management",
      difficulty: "Medium",
      scheduledFor: "Oct 21 • 40 min",
      completed: false,
      subtopics: ["Virtual memory paging translation", "Internal fragmentation reduction", "Copy-on-write sampling"]
    }
  ])

  const toggleRevisionCompleted = (id: string) => {
    setRevisionTopics(revisionTopics.map(r => r.id === id ? { ...r, completed: !r.completed } : r))
  }

  // --- STATE: BOOKMARKS ---
  const [bookmarkedLessons, setBookmarkedLessons] = useState<BookmarkedLesson[]>([
    {
      id: "lec-3",
      courseId: "cs-704",
      courseCode: "CS-704",
      title: "1.3 Memory Complexity: HBM Bandwidth Bounds and IO-Aware Attention",
      duration: "64m",
      instructor: "Dr. Ananya Sharma",
      savedAt: "Saved 2 days ago"
    },
    {
      id: "lec-4",
      courseId: "cs-704",
      courseCode: "CS-704",
      title: "1.4 Laboratory 1: Writing a Blocked Attention Kernel in PyTorch & Triton",
      duration: "90m",
      instructor: "Dr. Ananya Sharma",
      savedAt: "Saved yesterday"
    }
  ])

  const removeBookmark = (id: string) => {
    setBookmarkedLessons(bookmarkedLessons.filter(b => b.id !== id))
  }

  const filteredEvents = calendarEvents.filter(e => calendarFilter === "All" || e.type === calendarFilter)

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#111827] flex flex-col justify-between font-sans selection:bg-[#00694f] selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  STUDENT SOVEREIGN CONSOLE
                </span>
                <span className="font-mono text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
                  Matriculation ID: <strong className="text-gray-800">{user?.uid ? `STU-${user.uid.slice(0, 6).toUpperCase()}` : "STU-882104"}</strong>
                </span>
                <span className="font-mono text-xs text-gray-400">Autumn 2026 Academic Term</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Welcome back, {profile?.displayName || user?.email?.split("@")[0] || "Academic Scholar"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-3xl leading-relaxed">
                Graduate Engineering Program • Department of Computing &amp; Advanced Engineering. Track your ongoing course benchmarks, interactive video classrooms, study schedule, and certified transcripts.
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/student/courses/cs-704"
                className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-2"
              >
                <span>Resume Active Lab</span>
                <span>→</span>
              </Link>
              <Link
                to="/student/certificates/cs-704"
                className="py-2.5 px-4 bg-[#eeeef0] hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium transition-all"
              >
                Diplomas &amp; ECTS
              </Link>
              <Link
                to="/discussion"
                className="py-2.5 px-4 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl text-xs font-medium transition-all"
              >
                Colloquium
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

          {/* Tab Navigation Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-8 border-t border-black/[0.04] mt-8 no-scrollbar">
            {[
              { id: "courses", label: `Active Curricula & Progress (${enrolledCourses.length})`, icon: "📚" },
              { id: "calendar", label: `Academic Calendar (${calendarEvents.length})`, icon: "📅" },
              { id: "revision", label: `AI Revision & Study Plan (${revisionTopics.filter(t => !t.completed).length} pending)`, icon: "🧠" },
              { id: "bookmarks", label: `Bookmarked Lessons (${bookmarkedLessons.length})`, icon: "🔖" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as StudentTab)}
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

        {/* Institutional Announcements Banner */}
        {!dismissedNotice && (
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50/30 border border-emerald-200/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-9 h-9 rounded-2xl bg-[#00694f] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                📢
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111827] text-xs">Official Institutional Announcement:</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100/70 text-[#00694f] font-semibold">URGENT</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Supercomputing partition <strong className="font-mono text-gray-900">cluster-h100-eu4</strong> scheduled maintenance tonight 02:00-03:00 UTC. Checkpointed Slurm jobs will automatically resume.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDismissedNotice(true)}
              className="text-xs text-gray-400 hover:text-gray-700 font-mono shrink-0 self-end sm:self-auto cursor-pointer"
            >
              Dismiss ✕
            </button>
          </div>
        )}

        {/* Academic Status Strip (KPIs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Accumulated Credits</span>
            <div className="text-2xl font-bold text-[#00694f] font-mono">15.5 ECTS</div>
            <div className="text-xs text-gray-500">7.5 ECTS In Progress (Target: 30)</div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">HPC Supercomputing Quota</span>
            <div className="text-2xl font-bold text-[#111827] font-mono">54.5 / 80.0</div>
            <div className="text-xs text-emerald-600 font-semibold">H100 SXM5 GPU Hours Used</div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Academic Standing</span>
            <div className="text-2xl font-bold text-[#111827] font-mono">Grade A / 3.88</div>
            <div className="text-xs text-gray-500">Dean's Honors List Standing</div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Pending Submissions</span>
            <div className="text-2xl font-bold text-[#111827] font-mono">2 Benchmarks</div>
            <div className="text-xs text-[#00694f] font-semibold">Next due in 4 days (Lab 3)</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ACTIVE CURRICULA & PROGRESS */}
        {/* ========================================================================= */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Courses List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#111827] tracking-tight">Enrolled Laboratory Curricula</h2>
                    <p className="text-xs text-gray-500">Active coursework, video lecture streams, and per-lesson milestones.</p>
                  </div>
                  <Link to="/courses" className="text-xs font-semibold text-[#00694f] hover:underline">
                    Browse All Catalog →
                  </Link>
                </div>

                <div className="space-y-6">
                  {enrolledCourses.map((c) => (
                    <article
                      key={c.id}
                      className="p-6 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-5 hover:border-gray-200 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#00694f] px-2.5 py-0.5 border border-emerald-200/60 bg-emerald-50 rounded-lg">
                              {c.code}
                            </span>
                            <span className="text-xs font-medium text-gray-500">
                              {c.credits} • {c.term}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#111827] tracking-tight">
                            {c.title}
                          </h3>
                          <div className="text-xs text-gray-500">
                            Course Director: <span className="font-semibold text-gray-800">{c.instructor}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            to={`/student/courses/${c.id}`}
                            className="py-2 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm"
                          >
                            Open Player &amp; Lab
                          </Link>
                          <Link
                            to={`/student/certificates/${c.id}`}
                            className="py-2 px-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium transition-all"
                          >
                            Diploma
                          </Link>
                        </div>
                      </div>

                      {/* Progress Bar & Telemetry */}
                      <div className="space-y-2 pt-3 border-t border-black/[0.04]">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-gray-500">
                            Curriculum Completion: <strong className="text-gray-800">{c.progress}%</strong>
                          </span>
                          <span className="text-[#00694f] font-bold">
                            {c.completedLessons} of {c.totalLessons} Units Completed
                          </span>
                        </div>
                        <ProgressBar value={c.progress} variant="primary" size="sm" />
                        <div className="flex flex-col sm:flex-row justify-between text-xs pt-1 text-gray-500 gap-1">
                          <span>Next Topic: <strong className="text-gray-900 font-medium">{c.nextSession}</strong></span>
                          <span className="font-mono text-[#00694f] font-semibold">{c.nextDeadline}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* HPC Cluster Telemetry Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-4">
                <div className="border-b border-black/[0.04] pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#00694f] uppercase tracking-wider font-mono">HPC CLUSTER</span>
                    <h3 className="text-base font-bold text-[#111827] tracking-tight mt-0.5">
                      Supercomputing Tenancy
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#00694f] font-mono animate-pulse">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-gray-600">
                  <div className="flex justify-between p-2 rounded-xl bg-gray-50">
                    <span className="text-gray-400">Assigned Node:</span>
                    <span className="text-gray-900 font-semibold">cluster-h100-eu4</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-gray-50">
                    <span className="text-gray-400">Active Slurm Jobs:</span>
                    <span className="text-[#00694f] font-bold">1 Running (Job #4912)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-gray-50">
                    <span className="text-gray-400">Scratch NVMe Disk:</span>
                    <span className="text-gray-900 font-semibold">142 GB / 500 GB</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-gray-50">
                    <span className="text-gray-400">CUDA Compiler:</span>
                    <span className="text-gray-900 font-semibold">12.6 + PyTorch 2.5</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/student/courses/cs-704"
                    className="block w-full text-center py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-medium transition-all"
                  >
                    Open Jupyter &amp; SSH Terminal →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ACADEMIC CALENDAR & DEADLINES */}
        {/* ========================================================================= */}
        {activeTab === "calendar" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.04] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight">Academic Schedule &amp; Deadlines</h2>
                <p className="text-xs text-gray-500">Live lecture seminars, problem set submission dates, and proctored examinations.</p>
              </div>

              {/* Event Filter */}
              <div className="flex items-center gap-1.5">
                {(["All", "Lecture", "Lab Deadline", "Exam"] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCalendarFilter(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      calendarFilter === type
                        ? "bg-[#111827] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs hover:border-gray-200 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#00694f] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-[11px]">
                        {event.course}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                        event.type === "Exam"
                          ? "bg-red-50 text-red-700"
                          : event.type === "Lab Deadline"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-blue-50 text-blue-700"
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="font-bold text-gray-900 text-sm">{event.title}</div>
                    <div className="text-gray-500 text-[11px]">Venue: {event.location}</div>
                  </div>

                  <div className="flex md:flex-col items-end gap-1 font-mono text-[11px] shrink-0">
                    <span className="font-bold text-gray-900">{event.date}</span>
                    <span className="text-gray-500">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: AI REVISION & STUDY PLAN */}
        {/* ========================================================================= */}
        {activeTab === "revision" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.04] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight">Spaced Repetition &amp; Revision Plan</h2>
                <p className="text-xs text-gray-500">Autonomous study schedule configured from your syllabus milestones and lab benchmarks.</p>
              </div>
              <div className="font-mono text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100">
                Midterm Review Countdown: <strong className="text-[#00694f]">18 Days</strong>
              </div>
            </div>

            <div className="space-y-4">
              {revisionTopics.map(topic => (
                <div
                  key={topic.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    topic.completed
                      ? "bg-emerald-50/30 border-emerald-200/50 opacity-80"
                      : "bg-gray-50/80 border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={topic.completed}
                        onChange={() => toggleRevisionCompleted(topic.id)}
                        className="mt-1 h-4 w-4 rounded-md border-gray-300 text-[#00694f] focus:ring-[#00694f] cursor-pointer"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#00694f] font-bold text-xs">{topic.course}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            topic.difficulty === "High" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
                          }`}>
                            {topic.difficulty} Priority
                          </span>
                        </div>
                        <h4 className={`font-bold text-sm ${topic.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                          {topic.title}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {topic.subtopics.map((st, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-[10px] text-gray-600 font-mono">
                              • {st}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="font-mono text-xs text-gray-500 shrink-0 self-end sm:self-auto">
                      {topic.scheduledFor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: BOOKMARKED LESSONS */}
        {/* ========================================================================= */}
        {activeTab === "bookmarks" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="border-b border-black/[0.04] pb-4">
              <h2 className="text-xl font-bold text-[#111827] tracking-tight">Bookmarked Units &amp; Saved Lectures</h2>
              <p className="text-xs text-gray-500">Quickly jump back into lecture videos, mathematical derivations, or lab sessions you flagged for review.</p>
            </div>

            {bookmarkedLessons.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100 text-gray-500 text-xs">
                No bookmarked lessons yet. Click "★ Bookmark Lesson" in the Course Player to save units here.
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedLessons.map(b => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:border-gray-200 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#00694f] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-[11px]">
                          {b.courseCode}
                        </span>
                        <span className="font-mono text-gray-400 text-[11px]">{b.duration}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-[11px]">{b.savedAt}</span>
                      </div>
                      <div className="font-bold text-gray-900 text-sm">{b.title}</div>
                      <div className="text-gray-500 text-[11px]">Instructor: {b.instructor}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <Link
                        to={`/student/courses/${b.courseId}`}
                        className="py-2 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm"
                      >
                        Resume Lesson →
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeBookmark(b.id)}
                        className="py-2 px-3 bg-white border border-gray-200 hover:border-red-200 hover:text-red-600 text-gray-500 rounded-xl text-xs transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Scholar Academic Protocol
      </footer>
    </div>
  )
}
