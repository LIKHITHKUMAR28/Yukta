import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"

export type EvaluationStatus = "Passed CI" | "Under Review" | "Revision Required" | "Rejected"

interface Submission {
  id: string
  studentName: string
  studentId: string
  course: string
  assignment: string
  commitHash: string
  benchmarkScore: string
  status: EvaluationStatus
  grade: string
  feedback?: string
}

interface AssignmentSpec {
  id: string
  title: string
  course: string
  dueDate: string
  maxPoints: number
  deliverable: string
}

const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "sub-1",
    studentName: "Dhruv Varma",
    studentId: "STU-882104",
    course: "CS-704",
    assignment: "Lab 2: Custom Triton Attention Kernel",
    commitHash: "4f8a12d",
    benchmarkScore: "4.2 TFLOPS (100% of Roofline)",
    status: "Passed CI",
    grade: "98 / 100",
    feedback: "Exceptional memory coalescing and SRAM register reuse. Roofline theoretical limit reached."
  },
  {
    id: "sub-2",
    studentName: "Priya Sharma",
    studentId: "STU-882109",
    course: "CS-704",
    assignment: "Lab 2: Custom Triton Attention Kernel",
    commitHash: "9b3c411",
    benchmarkScore: "3.9 TFLOPS (92% of Roofline)",
    status: "Under Review",
    grade: "92 / 100",
    feedback: "High performance kernel with minor bank conflict in shared memory staging."
  },
  {
    id: "sub-3",
    studentName: "Rohan Kulkarni",
    studentId: "STU-882115",
    course: "CS-602",
    assignment: "Problem Set 1: Ring-AllReduce Bounds",
    commitHash: "7e2a90f",
    benchmarkScore: "LaTeX Mathematical Proof",
    status: "Under Review",
    grade: "Pending",
    feedback: "Verification in progress for Lemma 3.2 on bandwidth constraints."
  },
  {
    id: "sub-4",
    studentName: "Kavya Patel",
    studentId: "STU-882120",
    course: "CS-704",
    assignment: "Lab 1: KV-Cache Online Softmax",
    commitHash: "1a8b94c",
    benchmarkScore: "Numerical Inaccuracy in FP16",
    status: "Revision Required",
    grade: "Needs Revision",
    feedback: "Online softmax accumulator experiences overflow in half-precision format. Switch to FP32 accumulator."
  },
  {
    id: "sub-5",
    studentName: "Arjun Nair",
    studentId: "STU-882126",
    course: "CS-602",
    assignment: "Lab 1: Consensus State Machine",
    commitHash: "3d5f81a",
    benchmarkScore: "Split-Brain Invariant Failed",
    status: "Rejected",
    grade: "45 / 100",
    feedback: "Raft leader lease allows simultaneous dual leaders under network partition."
  }
]

export const Assignments: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS)
  const [selectedCourse, setSelectedCourse] = useState("All")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // In-progress inline grade edits
  const [inlineGrades, setInlineGrades] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {}
    INITIAL_SUBMISSIONS.forEach(s => {
      map[s.id] = s.grade
    })
    return map
  })

  // Full Evaluation & Review Modal State
  const [evaluatingSubmission, setEvaluatingSubmission] = useState<Submission | null>(null)
  const [modalGrade, setModalGrade] = useState("")
  const [modalStatus, setModalStatus] = useState<EvaluationStatus>("Passed CI")
  const [modalFeedback, setModalFeedback] = useState("")

  // Create Assignment State
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newCourse, setNewCourse] = useState("CS-704")
  const [newDueDate, setNewDueDate] = useState("")
  const [newMaxPoints, setNewMaxPoints] = useState("100")
  const [newDeliverable, setNewDeliverable] = useState("")

  const [activeTab, setActiveTab] = useState<"submissions" | "assignments">("submissions")

  const [assignmentsList, setAssignmentsList] = useState<AssignmentSpec[]>([
    { id: "asg-1", title: "Lab 1: KV-Cache Online Softmax & Memory Profiling", course: "CS-704", dueDate: "Oct 05, 2026", maxPoints: 100, deliverable: "PyTorch Online Softmax Kernel" },
    { id: "asg-2", title: "Lab 2: Custom Triton Attention Kernel on H100", course: "CS-704", dueDate: "Oct 12, 2026", maxPoints: 100, deliverable: "Triton JIT Kernel & Benchmark Report" },
    { id: "asg-3", title: "Problem Set 1: Proof of Ring-AllReduce Lower Bounds", course: "CS-602", dueDate: "Oct 22, 2026", maxPoints: 50, deliverable: "LaTeX Mathematical Derivation PDF" }
  ])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // 1. Direct status change in dropdown
  const handleUpdateStatus = (id: string, newStatus: EvaluationStatus) => {
    const target = submissions.find(s => s.id === id)
    setSubmissions(prev =>
      prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
    )
    showToast(`Evaluation status for ${target?.studentName || id} updated to "${newStatus}".`)
  }

  // 2. Direct inline grade save
  const handleSaveInlineGrade = (id: string) => {
    const val = inlineGrades[id] ?? ""
    const target = submissions.find(s => s.id === id)
    setSubmissions(prev =>
      prev.map(s => (s.id === id ? { ...s, grade: val.trim() || "Pending" } : s))
    )
    showToast(`Marks "${val.trim()}" saved and recorded for ${target?.studentName || id}.`)
  }

  // 3. Open Evaluation Modal
  const handleOpenEvaluationModal = (sub: Submission) => {
    setEvaluatingSubmission(sub)
    setModalGrade(sub.grade)
    setModalStatus(sub.status)
    setModalFeedback(sub.feedback || "")
  }

  // 4. Save from Evaluation Modal
  const handleSaveEvaluationModal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!evaluatingSubmission) return

    setSubmissions(prev =>
      prev.map(s => {
        if (s.id === evaluatingSubmission.id) {
          return {
            ...s,
            grade: modalGrade.trim() || s.grade,
            status: modalStatus,
            feedback: modalFeedback.trim()
          }
        }
        return s
      })
    )

    setInlineGrades(prev => ({
      ...prev,
      [evaluatingSubmission.id]: modalGrade.trim() || evaluatingSubmission.grade
    }))

    showToast(`Full evaluation & grade submitted for ${evaluatingSubmission.studentName}.`)
    setEvaluatingSubmission(null)
  }

  // Create Assignment
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newObj: AssignmentSpec = {
      id: `asg-${Date.now()}`,
      title: newTitle.trim(),
      course: newCourse,
      dueDate: newDueDate || "Nov 15, 2026",
      maxPoints: parseInt(newMaxPoints, 10) || 100,
      deliverable: newDeliverable.trim() || "Git repository benchmark commit"
    }

    setAssignmentsList([...assignmentsList, newObj])
    setShowCreateModal(false)
    setNewTitle("")
    setNewDeliverable("")
    showToast(`Assignment "${newObj.title}" assigned to cohort ${newObj.course}.`)
  }

  const filtered = selectedCourse === "All"
    ? submissions
    : submissions.filter(s => s.course === selectedCourse)

  // Telemetry counts
  const passedCount = submissions.filter(s => s.status === "Passed CI").length
  const underReviewCount = submissions.filter(s => s.status === "Under Review").length
  const revisionCount = submissions.filter(s => s.status === "Revision Required").length
  const rejectedCount = submissions.filter(s => s.status === "Rejected").length

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Link to="/trainer/dashboard" className="text-xs font-semibold text-[#00694f] hover:underline flex items-center gap-1">
                  <span>← Faculty Console</span>
                </Link>
                <span className="text-gray-300">/</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  CI/CD LAB EVALUATIONS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Benchmark Submissions &amp; Assignment Manager
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
                Review automated roofline benchmarks, update evaluation statuses directly via dropdown, enter marks, and submit qualitative feedback.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>+ Create Assignment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Telemetry Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-black/[0.04] shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Total Submissions</span>
            <div className="text-2xl font-bold text-[#111827] font-mono">{submissions.length}</div>
            <div className="text-xs text-gray-500">Across active graduate tracks</div>
          </div>

          <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-[#00694f] uppercase tracking-wider font-mono">Passed CI</span>
            <div className="text-2xl font-bold text-[#00694f] font-mono">{passedCount}</div>
            <div className="text-xs text-emerald-700">Verified roofline throughput</div>
          </div>

          <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider font-mono">Under Review</span>
            <div className="text-2xl font-bold text-amber-700 font-mono">{underReviewCount}</div>
            <div className="text-xs text-amber-600">Awaiting faculty evaluation</div>
          </div>

          <div className="p-5 bg-red-50/50 rounded-2xl border border-red-100 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider font-mono">Needs Action</span>
            <div className="text-2xl font-bold text-red-600 font-mono">{revisionCount + rejectedCount}</div>
            <div className="text-xs text-red-600">{revisionCount} Revision / {rejectedCount} Rejected</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-black/[0.04] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("submissions")}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "submissions"
                ? "bg-[#00694f] text-white shadow-xs"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Candidate Submissions Queue ({submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("assignments")}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "assignments"
                ? "bg-[#00694f] text-white shadow-xs"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Published Lab Problem Sets ({assignmentsList.length})
          </button>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: SUBMISSIONS REVIEW */}
        {/* ========================================================================= */}
        {activeTab === "submissions" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.04] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight">Candidate Submissions Ledger</h2>
                <p className="text-xs text-gray-500">Automated roofline benchmark telemetry on H100 clusters, evaluation status dropdown, and marks submission.</p>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Filter Cohort:</span>
                <select
                  value={selectedCourse}
                  onChange={e => setSelectedCourse(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-gray-200 text-xs font-mono text-gray-800 bg-white focus:outline-none focus:border-[#00694f] cursor-pointer"
                >
                  <option value="All">All Curricula</option>
                  <option value="CS-704">CS-704: Advanced ML Systems</option>
                  <option value="CS-602">CS-602: Distributed OS</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-mono text-[11px]">
                    <th className="py-3 px-4 font-semibold">Scholar Name &amp; ID</th>
                    <th className="py-3 px-4 font-semibold">Curriculum</th>
                    <th className="py-3 px-4 font-semibold">Deliverable</th>
                    <th className="py-3 px-4 font-semibold">Git Commit</th>
                    <th className="py-3 px-4 font-semibold">CI Benchmark Telemetry</th>
                    <th className="py-3 px-4 font-semibold">Evaluation Status (Dropdown)</th>
                    <th className="py-3 px-4 font-semibold text-right">Award / Save Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(sub => (
                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Scholar Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900">{sub.studentName}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{sub.studentId}</div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-800">{sub.course}</td>

                      {/* Deliverable */}
                      <td className="py-3.5 px-4 text-gray-700 max-w-xs truncate">{sub.assignment}</td>

                      {/* Git Commit */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-gray-700">
                          {sub.commitHash}
                        </span>
                      </td>

                      {/* CI Benchmark */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#00694f] text-[11px]">
                        {sub.benchmarkScore}
                      </td>

                      {/* Evaluation Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <div className="relative inline-block w-40">
                          <select
                            value={sub.status}
                            onChange={e => handleUpdateStatus(sub.id, e.target.value as EvaluationStatus)}
                            className={`w-full h-8 px-2.5 rounded-lg border font-mono text-xs font-semibold focus:outline-none transition-all cursor-pointer shadow-xs ${
                              sub.status === "Passed CI"
                                ? "bg-emerald-50 text-[#00694f] border-emerald-300 focus:border-[#00694f]"
                                : sub.status === "Under Review"
                                ? "bg-amber-50 text-amber-700 border-amber-300 focus:border-amber-600"
                                : sub.status === "Revision Required"
                                ? "bg-red-50 text-red-700 border-red-300 focus:border-red-600"
                                : "bg-gray-100 text-gray-700 border-gray-300 focus:border-gray-600"
                            }`}
                          >
                            <option value="Passed CI">✓ Passed CI</option>
                            <option value="Under Review">⏳ Under Review</option>
                            <option value="Revision Required">⚠️ Revision Required</option>
                            <option value="Rejected">✕ Rejected</option>
                          </select>
                        </div>
                      </td>

                      {/* Save Marks & Review Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Marks Input */}
                          <input
                            type="text"
                            value={inlineGrades[sub.id] ?? sub.grade}
                            onChange={e =>
                              setInlineGrades({
                                ...inlineGrades,
                                [sub.id]: e.target.value
                              })
                            }
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                handleSaveInlineGrade(sub.id)
                              }
                            }}
                            placeholder="e.g. 95 / 100"
                            className="w-24 h-8 px-2 rounded-lg border border-gray-200 text-right text-xs font-mono font-bold text-gray-900 focus:outline-none focus:border-[#00694f]"
                          />

                          {/* Save Marks Button */}
                          <button
                            type="button"
                            onClick={() => handleSaveInlineGrade(sub.id)}
                            className="py-1.5 px-3 bg-[#00694f] hover:bg-[#00523e] text-white rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer shrink-0"
                          >
                            Save
                          </button>

                          {/* Detailed Evaluation / Feedback Modal Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenEvaluationModal(sub)}
                            className="py-1.5 px-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0"
                            title="Open full review and feedback rubric"
                          >
                            Review &amp; Feedback
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: ASSIGNMENT SPECIFICATIONS */}
        {/* ========================================================================= */}
        {activeTab === "assignments" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="border-b border-black/[0.04] pb-4">
              <h2 className="text-xl font-bold text-[#111827] tracking-tight">Active Curriculum Laboratory Assignments</h2>
              <p className="text-xs text-gray-500">Problem sets and supercomputing benchmarks currently published to students.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {assignmentsList.map(asg => (
                <div key={asg.id} className="p-6 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-[#00694f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {asg.course}
                    </span>
                    <span className="font-mono text-[11px] text-gray-400">Max: {asg.maxPoints} pts</span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{asg.title}</h3>
                  <div className="text-xs text-gray-600">Deliverable: {asg.deliverable}</div>

                  <div className="pt-2 border-t border-black/[0.04] font-mono text-[11px] text-gray-500">
                    Due: <strong className="text-gray-900">{asg.dueDate}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Evaluation & Review Modal */}
        {evaluatingSubmission && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xl p-8 max-w-lg w-full space-y-6 animate-scale-up">
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Laboratory Submission Evaluation</h3>
                  <p className="text-xs text-gray-500 font-mono">
                    {evaluatingSubmission.studentName} ({evaluatingSubmission.studentId}) • {evaluatingSubmission.course}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEvaluatingSubmission(null)}
                  className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Benchmark Summary Box */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Deliverable:</span>
                  <span className="font-semibold text-gray-900">{evaluatingSubmission.assignment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Commit Hash:</span>
                  <span className="text-gray-700 font-bold">{evaluatingSubmission.commitHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CI Benchmark Telemetry:</span>
                  <span className="text-[#00694f] font-bold">{evaluatingSubmission.benchmarkScore}</span>
                </div>
              </div>

              <form onSubmit={handleSaveEvaluationModal} className="space-y-4">
                {/* Status Dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-mono">
                    Evaluation Status
                  </label>
                  <select
                    value={modalStatus}
                    onChange={e => setModalStatus(e.target.value as EvaluationStatus)}
                    className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-mono font-semibold text-gray-900 bg-white focus:outline-none focus:border-[#00694f]"
                  >
                    <option value="Passed CI">✓ Passed CI (Approved)</option>
                    <option value="Under Review">⏳ Under Review</option>
                    <option value="Revision Required">⚠️ Revision Required</option>
                    <option value="Rejected">✕ Rejected</option>
                  </select>
                </div>

                {/* Score Input */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-mono">
                    Marks / Score Awarded
                  </label>
                  <Input
                    value={modalGrade}
                    onChange={e => setModalGrade(e.target.value)}
                    placeholder="e.g. 96 / 100"
                    required
                  />
                </div>

                {/* Written Feedback */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-mono">
                    Faculty Qualitative Feedback &amp; Roofline Critique
                  </label>
                  <textarea
                    rows={4}
                    value={modalFeedback}
                    onChange={e => setModalFeedback(e.target.value)}
                    placeholder="Provide detailed feedback on kernel profiling, register pressure, algorithmic complexity, or revision requirements..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs font-sans text-gray-900 focus:outline-none focus:border-[#00694f]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEvaluatingSubmission(null)}
                    className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium shadow-sm cursor-pointer"
                  >
                    Submit &amp; Save Grade →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Assignment Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xl p-8 max-w-md w-full space-y-6 animate-scale-up">
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-3">
                <h3 className="font-bold text-lg text-gray-900">Create &amp; Post Lab Assignment</h3>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <Input
                  label="Assignment Title"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Lab 3: QLoRA 4-bit Weight Decomposition"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                      Course Code
                    </label>
                    <select
                      value={newCourse}
                      onChange={e => setNewCourse(e.target.value)}
                      className="w-full h-11 rounded-xl border border-black/[0.08] bg-white px-3 text-xs font-mono text-[#111827] focus:outline-none focus:border-[#00694f]"
                    >
                      <option value="CS-704">CS-704</option>
                      <option value="CS-602">CS-602</option>
                    </select>
                  </div>

                  <Input
                    label="Max Points"
                    type="number"
                    value={newMaxPoints}
                    onChange={e => setNewMaxPoints(e.target.value)}
                  />
                </div>

                <Input
                  label="Submission Due Date"
                  value={newDueDate}
                  onChange={e => setNewDueDate(e.target.value)}
                  placeholder="e.g. Oct 28, 2026 • 23:59 UTC"
                />

                <Input
                  label="Required Deliverable Specification"
                  value={newDeliverable}
                  onChange={e => setNewDeliverable(e.target.value)}
                  placeholder="e.g. Triton Kernel Code + Flop Benchmark"
                />

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium shadow-sm cursor-pointer"
                  >
                    Post Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Laboratory Benchmarking Protocol
      </footer>
    </div>
  )
}
