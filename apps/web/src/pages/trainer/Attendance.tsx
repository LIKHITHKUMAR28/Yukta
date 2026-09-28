import React, { useState, useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"

export type AttendanceStatus = "Present" | "Absent" | "Excused" | "Suspended"

interface StudentRoll {
  id: string
  name: string
  email: string
  matriculation: string
  status: AttendanceStatus
  participationScore: number
  note: string
}

interface SessionDefinition {
  id: string
  title: string
  course: string
  date: string
  time: string
  room: string
  instructor: string
}

const AVAILABLE_SESSIONS: SessionDefinition[] = [
  {
    id: "cs704-sem41",
    title: "Seminar 4.1: Continuous Batching Schedulers & Virtual Memory Pages",
    course: "CS-704",
    date: "Today, Oct 15, 2026",
    time: "16:00 – 17:30 IST",
    room: "Virtual Lab Room 4B",
    instructor: "Dr. Ananya Sharma"
  },
  {
    id: "cs704-sem32",
    title: "Seminar 3.2: FlashAttention Roofline Derivations & IO-Complexity",
    course: "CS-704",
    date: "Oct 10, 2026",
    time: "16:00 – 17:30 IST",
    room: "Virtual Lab Room 4B",
    instructor: "Dr. Ananya Sharma"
  },
  {
    id: "cs704-sem31",
    title: "Seminar 3.1: Kernel Tiling Principles & SRAM Staging",
    course: "CS-704",
    date: "Oct 03, 2026",
    time: "16:00 – 17:30 IST",
    room: "Virtual Lab Room 4B",
    instructor: "Dr. Ananya Sharma"
  },
  {
    id: "cs602-sem201",
    title: "Office Hours: Debugging Distributed Tensor Parallelism Kernels",
    course: "CS-602",
    date: "Tomorrow, Oct 16, 2026",
    time: "14:00 – 16:00 IST",
    room: "Virtual Lab Room 2A",
    instructor: "Vikram Malhotra"
  },
  {
    id: "cs602-lec5",
    title: "Lecture 5: Consensus in Partitioned Topologies (Raft & Paxos)",
    course: "CS-602",
    date: "Oct 09, 2026",
    time: "10:00 – 11:30 IST",
    room: "Virtual Auditorium B",
    instructor: "Vikram Malhotra"
  },
  {
    id: "sec620-col1",
    title: "Colloquium: Empirical Safety Red-Teaming & Contamination Audits",
    course: "SEC-620",
    date: "Oct 19, 2026",
    time: "15:00 – 17:00 IST",
    room: "Virtual Auditorium A",
    instructor: "Dr. Sunita Rao"
  }
]

const INITIAL_STUDENTS: StudentRoll[] = [
  { id: "s-1", name: "Dhruv Varma", email: "dhruv.varma@university.edu", matriculation: "STU-882104", status: "Present", participationScore: 5, note: "Answered IO-complexity question" },
  { id: "s-2", name: "Priya Sharma", email: "priya.sharma@university.edu", matriculation: "STU-882109", status: "Present", participationScore: 4, note: "" },
  { id: "s-3", name: "Rohan Kulkarni", email: "rohan.kulkarni@university.edu", matriculation: "STU-882115", status: "Excused", participationScore: 3, note: "Medical clinic appointment form filed" },
  { id: "s-4", name: "Kavya Patel", email: "kavya.patel@university.edu", matriculation: "STU-882120", status: "Present", participationScore: 5, note: "Presented Roofline analysis" },
  { id: "s-5", name: "Arjun Nair", email: "arjun.nair@university.edu", matriculation: "STU-882126", status: "Absent", participationScore: 1, note: "No prior notification" },
  { id: "s-6", name: "Karthik Ramachandran", email: "karthik.r@university.edu", matriculation: "STU-882131", status: "Suspended", participationScore: 0, note: "Academic honor council suspension" }
]

export const Attendance: React.FC = () => {
  const [searchParams] = useSearchParams()
  const initialCourse = searchParams.get("course") || "CS-704"
  const initialSessionTitle = searchParams.get("session") || ""

  const [selectedCourse, setSelectedCourse] = useState<string>(initialCourse)
  
  // Filter sessions matching course
  const courseSessions = useMemo(() => {
    return AVAILABLE_SESSIONS.filter(s => s.course === selectedCourse)
  }, [selectedCourse])

  // Current session ID
  const [selectedSessionId, setSelectedSessionId] = useState<string>(() => {
    if (initialSessionTitle) {
      const match = AVAILABLE_SESSIONS.find(s => s.title.toLowerCase().includes(initialSessionTitle.toLowerCase()))
      if (match) return match.id
    }
    const firstCourseSession = AVAILABLE_SESSIONS.find(s => s.course === initialCourse)
    return firstCourseSession ? firstCourseSession.id : AVAILABLE_SESSIONS[0].id
  })

  // Active session object
  const activeSession = useMemo(() => {
    return AVAILABLE_SESSIONS.find(s => s.id === selectedSessionId) || AVAILABLE_SESSIONS[0]
  }, [selectedSessionId])

  const [students, setStudents] = useState<StudentRoll[]>(INITIAL_STUDENTS)
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Quick note modal state
  const [editingNoteStudent, setEditingNoteStudent] = useState<StudentRoll | null>(null)
  const [noteText, setNoteText] = useState("")

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Update status with explicit option selection
  const handleSetStatus = (id: string, newStatus: AttendanceStatus) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
    )
    showToast(`Updated status for scholar to ${newStatus}.`)
  }

  const handleSetScore = (id: string, score: number) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, participationScore: score } : s))
    )
  }

  const handleOpenNoteModal = (student: StudentRoll) => {
    setEditingNoteStudent(student)
    setNoteText(student.note)
  }

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingNoteStudent) return
    setStudents(prev =>
      prev.map(s => (s.id === editingNoteStudent.id ? { ...s, note: noteText.trim() } : s))
    )
    showToast(`Note updated for ${editingNoteStudent.name}.`)
    setEditingNoteStudent(null)
  }

  const handleMarkAll = (status: AttendanceStatus) => {
    setStudents(prev => prev.map(s => ({ ...s, status })))
    showToast(`All cohort scholars marked as ${status}.`)
  }

  const handleSaveRoll = () => {
    showToast(`Attendance record for "${activeSession.title}" submitted to Academic Registrar.`)
  }

  // Telemetry counts
  const presentCount = students.filter(s => s.status === "Present").length
  const absentCount = students.filter(s => s.status === "Absent").length
  const excusedCount = students.filter(s => s.status === "Excused").length
  const suspendedCount = students.filter(s => s.status === "Suspended").length
  const attendanceRate = Math.round((presentCount / students.length) * 100)

  // Filtered student list
  const filteredStudents = students.filter(s => {
    const matchesFilter = statusFilter === "All" || s.status === statusFilter
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.matriculation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
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

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        
        {/* Header Breadcrumb Card */}
        <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Link to="/trainer/dashboard" className="text-xs font-semibold text-[#00694f] hover:underline flex items-center gap-1">
                  <span>← Faculty Console</span>
                </Link>
                <span className="text-gray-300">/</span>
                <Link to="/trainer/live-classes" className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                  Live Classes
                </Link>
                <span className="text-gray-300">/</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  SESSION ATTENDANCE ROLL
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Colloquium &amp; Lab Attendance Ledger
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-3xl leading-relaxed">
                Record attendance with explicit verification options (<strong className="text-emerald-700">Present</strong>, <strong className="text-red-700">Absent</strong>, <strong className="text-amber-700">Excused</strong>, and <strong className="text-purple-700">Suspended</strong>) for ECTS accreditation compliance.
              </p>
            </div>

            {/* Global Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/trainer/live-classes"
                className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium transition-all"
              >
                Schedule Classes
              </Link>
              <button
                type="button"
                onClick={handleSaveRoll}
                className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>Save &amp; Submit to Registrar →</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SESSION SELECTION CARD */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
          <div className="border-b border-black/[0.04] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Session Selector</span>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Choose Curriculum &amp; Synchronous Seminar</h2>
            </div>
            <span className="text-xs font-mono text-gray-400">Total Enrolled in Roll: {students.length} Scholars</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Curriculum Choice */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider font-mono">
                1. Select Curriculum Cohort
              </label>
              <select
                value={selectedCourse}
                onChange={e => {
                  const newC = e.target.value
                  setSelectedCourse(newC)
                  const matching = AVAILABLE_SESSIONS.filter(s => s.course === newC)
                  if (matching.length > 0) {
                    setSelectedSessionId(matching[0].id)
                  }
                }}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-200 font-mono text-xs text-gray-900 bg-white focus:outline-none focus:border-[#00694f] cursor-pointer shadow-xs"
              >
                <option value="CS-704">CS-704: Advanced Machine Learning Systems (34 Scholars)</option>
                <option value="CS-602">CS-602: Distributed Operating Systems (42 Scholars)</option>
                <option value="SEC-620">SEC-620: Model Safety &amp; Red-Teaming (28 Scholars)</option>
              </select>
            </div>

            {/* Session Choice */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider font-mono">
                2. Select Seminar / Lab Session
              </label>
              <select
                value={selectedSessionId}
                onChange={e => setSelectedSessionId(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-200 font-mono text-xs text-gray-900 bg-white focus:outline-none focus:border-[#00694f] cursor-pointer shadow-xs"
              >
                {courseSessions.map(sess => (
                  <option key={sess.id} value={sess.id}>
                    {sess.title} ({sess.date})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Session Metadata Strip */}
          <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#00694f] text-white font-mono text-[10px] font-bold">
                  {activeSession.course}
                </span>
                <span className="font-bold text-sm text-gray-900">{activeSession.title}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-mono">
                <span>🗓️ {activeSession.date}</span>
                <span>⏰ {activeSession.time}</span>
                <span>📍 {activeSession.room}</span>
                <span>👤 Lead: <strong className="text-gray-700">{activeSession.instructor}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => handleMarkAll("Present")}
                className="py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#00694f] rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                Mark All Present
              </button>
              <button
                type="button"
                onClick={() => handleMarkAll("Absent")}
                className="py-1.5 px-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                Mark All Absent
              </button>
            </div>
          </div>

          {/* Telemetry Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Attendance Rate</span>
              <div className="text-xl font-bold text-[#00694f] font-mono">{attendanceRate}%</div>
              <span className="text-[11px] text-gray-500">{presentCount} of {students.length} scholars</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-[#00694f] uppercase tracking-wider font-mono">Present</span>
              <div className="text-xl font-bold text-[#00694f] font-mono">{presentCount}</div>
              <span className="text-[11px] text-emerald-700">In physical/virtual attendance</span>
            </div>

            <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider font-mono">Absent</span>
              <div className="text-xl font-bold text-red-600 font-mono">{absentCount}</div>
              <span className="text-[11px] text-red-600">Unexcused absence</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider font-mono">Excused</span>
              <div className="text-xl font-bold text-amber-600 font-mono">{excusedCount}</div>
              <span className="text-[11px] text-amber-700">Official dispensation</span>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider font-mono">Suspended</span>
              <div className="text-xl font-bold text-purple-700 font-mono">{suspendedCount}</div>
              <span className="text-[11px] text-purple-700">Honor / academic hold</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STUDENT ROLL TABLE & EXPLICIT OPTION BUTTONS */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.04] pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Scholar Matriculation Roll</h2>
              <p className="text-xs text-gray-500">Select explicit attendance verification options for each enrolled scholar.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "All", label: `All (${students.length})` },
                { id: "Present", label: `Present (${presentCount})` },
                { id: "Absent", label: `Absent (${absentCount})` },
                { id: "Excused", label: `Excused (${excusedCount})` },
                { id: "Suspended", label: `Suspended (${suspendedCount})` }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === f.id
                      ? "bg-[#00694f] text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="max-w-md">
            <Input
              placeholder="Search scholar by name, matriculation ID, or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Roll Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-mono text-[11px]">
                  <th className="py-3 px-4 font-semibold">Scholar &amp; ID</th>
                  <th className="py-3 px-4 font-semibold">Attendance Options (Explicit)</th>
                  <th className="py-3 px-4 font-semibold text-center">Participation (1-5)</th>
                  <th className="py-3 px-4 font-semibold">Status Notes</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400 font-mono">
                      No scholars match the selected filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(stu => (
                    <tr key={stu.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Scholar Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00694f] font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-100 font-mono">
                            {stu.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{stu.name}</div>
                            <div className="text-[11px] text-gray-400 font-mono">
                              {stu.matriculation} • {stu.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Explicit Attendance Options Button Group */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center p-1 rounded-xl bg-gray-100 border border-gray-200/80 gap-1">
                          {/* Option 1: Present */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(stu.id, "Present")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                              stu.status === "Present"
                                ? "bg-[#00694f] text-white shadow-xs"
                                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${stu.status === "Present" ? "bg-white" : "bg-emerald-600"}`} />
                            <span>Present</span>
                          </button>

                          {/* Option 2: Absent */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(stu.id, "Absent")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                              stu.status === "Absent"
                                ? "bg-red-600 text-white shadow-xs"
                                : "text-gray-600 hover:text-red-700 hover:bg-white/60"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${stu.status === "Absent" ? "bg-white" : "bg-red-500"}`} />
                            <span>Absent</span>
                          </button>

                          {/* Option 3: Excused */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(stu.id, "Excused")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                              stu.status === "Excused"
                                ? "bg-amber-600 text-white shadow-xs"
                                : "text-gray-600 hover:text-amber-700 hover:bg-white/60"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${stu.status === "Excused" ? "bg-white" : "bg-amber-500"}`} />
                            <span>Excused</span>
                          </button>

                          {/* Option 4: Suspended */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(stu.id, "Suspended")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                              stu.status === "Suspended"
                                ? "bg-purple-700 text-white shadow-xs"
                                : "text-gray-600 hover:text-purple-700 hover:bg-white/60"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${stu.status === "Suspended" ? "bg-white" : "bg-purple-600"}`} />
                            <span>Suspended</span>
                          </button>
                        </div>
                      </td>

                      {/* Participation Rating */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(score => (
                            <button
                              key={score}
                              type="button"
                              onClick={() => handleSetScore(stu.id, score)}
                              title={`Participation level ${score}/5`}
                              className={`w-6 h-6 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                                stu.participationScore >= score
                                  ? "bg-[#00694f] text-white"
                                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                              }`}
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                      </td>

                      {/* Note snippet */}
                      <td className="py-3.5 px-4 text-gray-500 max-w-xs truncate">
                        {stu.note ? (
                          <span className="font-mono text-[11px] text-gray-700 bg-gray-50 border border-gray-200/60 rounded px-2 py-0.5">
                            {stu.note}
                          </span>
                        ) : (
                          <span className="text-gray-300 italic text-[11px]">—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenNoteModal(stu)}
                          className="py-1 px-3 bg-white border border-gray-200 hover:border-[#00694f] hover:text-[#00694f] text-gray-700 rounded-lg text-xs font-medium transition-all cursor-pointer"
                        >
                          Add Note
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note / Annotation Modal */}
        {editingNoteStudent && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xl p-8 max-w-md w-full space-y-6 animate-scale-up">
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Attendance Annotation</h3>
                  <p className="text-xs text-gray-500 font-mono">
                    {editingNoteStudent.name} ({editingNoteStudent.matriculation})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingNoteStudent(null)}
                  className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveNote} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-mono">
                    Official Justification / Note
                  </label>
                  <textarea
                    rows={3}
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="e.g. Approved medical absence, academic tribunal sanction, or seminar contribution note..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs font-sans text-gray-900 focus:outline-none focus:border-[#00694f]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingNoteStudent(null)}
                    className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium shadow-sm cursor-pointer"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • ECTS Attendance Compliance Protocol
      </footer>
    </div>
  )
}
