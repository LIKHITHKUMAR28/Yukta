import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"

interface LessonDraft {
  id: string
  title: string
  videoUrl: string
  pdfUrl: string
  description: string
  durationMinutes: number
  tags: string[]
  readings: string
}

interface QuizDraftQuestion {
  id: string
  type: "MCQ" | "True/False" | "Short-Answer"
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

export const CourseBuilder: React.FC = () => {
  // Course Metadata State
  const [courseCode, setCourseCode] = useState("CS-810")
  const [courseTitle, setCourseTitle] = useState("Distributed Graph Neural Networks & Hardware Accelerators")
  const [department, setDepartment] = useState("Distributed Systems & Machine Learning")
  const [credits, setCredits] = useState("4.0 ECTS")
  const [durationWeeks, setDurationWeeks] = useState("14")
  const [gpuHours, setGpuHours] = useState("80")
  const [prerequisites, setPrerequisites] = useState("CS-704 (Adv ML Systems), Multivariable Calculus, CUDA C++ Basics")
  const [description, setDescription] = useState(
    "Advanced analysis of sparse matrix multiplication, message-passing topologies across NVLink partitions, and custom CUDA Graph kernels."
  )

  // Lessons State
  const [lessons, setLessons] = useState<LessonDraft[]>([
    {
      id: "les-1",
      title: "Unit 1: Sparse Representation Geometry & SpMM Kernels",
      videoUrl: "https://www.youtube.com/watch?v=kCc8FmEb1nY",
      pdfUrl: "https://yukta.edu/curriculum/cs810/unit1-spmm.pdf",
      description: "Mathematical formulation of sparse adjacency matrices and roofline memory analysis on H100 SXM5.",
      durationMinutes: 55,
      tags: ["CUDA", "SpMM", "Linear Algebra"],
      readings: "Fey et al. (2023). 'Fast Graph Representation Learning'. ICLR."
    },
    {
      id: "les-2",
      title: "Unit 2: Distributed GPU Partitioning with METIS",
      videoUrl: "https://www.youtube.com/watch?v=bQ5BoolX9Ag",
      pdfUrl: "https://yukta.edu/curriculum/cs810/unit2-metis.pdf",
      description: "Minimizing inter-node communication boundaries in multi-GPU cluster message passing.",
      durationMinutes: 60,
      tags: ["Distributed", "METIS", "PyTorch"],
      readings: "Zheng et al. (2020). 'DistDGL: Distributed Graph Neural Network Training'. VLDB."
    }
  ])

  // Lesson Upload Modal State
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [newLessonTitle, setNewLessonTitle] = useState("")
  const [newLessonVideoUrl, setNewLessonVideoUrl] = useState("")
  const [newLessonPdfUrl, setNewLessonPdfUrl] = useState("")
  const [newLessonDescription, setNewLessonDescription] = useState("")
  const [newLessonTags, setNewLessonTags] = useState("")
  const [newLessonReadings, setNewLessonReadings] = useState("")

  // Quiz Builder State
  const [quizQuestions, setQuizQuestions] = useState<QuizDraftQuestion[]>([
    {
      id: "q-1",
      type: "MCQ",
      question: "Which matrix storage format is optimal for row-slicing in distributed GPU SpMM?",
      options: ["Compressed Sparse Row (CSR)", "Compressed Sparse Column (CSC)", "Coordinate List (COO)", "Dense Row-Major"],
      correctAnswer: "Compressed Sparse Row (CSR)",
      explanation: "CSR stores contiguous row values in memory, allowing CUDA warps to read row pointers with coalesced memory accesses."
    },
    {
      id: "q-2",
      type: "True/False",
      question: "Message-passing GNNs scale linearly with cluster nodes without any inter-node communication overhead.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Boundary cut nodes necessitate extensive all-to-all collective communication across InfiniBand interconnects."
    }
  ])

  // Quiz Modal State
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [newQType, setNewQType] = useState<"MCQ" | "True/False" | "Short-Answer">("MCQ")
  const [newQText, setNewQText] = useState("")
  const [newQOptions, setNewQOptions] = useState("Option A, Option B, Option C, Option D")
  const [newQCorrect, setNewQCorrect] = useState("")
  const [newQExplanation, setNewQExplanation] = useState("")

  const [activeTab, setActiveTab] = useState<"curriculum" | "lessons" | "quiz">("curriculum")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLessonTitle.trim()) return

    const newObj: LessonDraft = {
      id: `les-${Date.now()}`,
      title: newLessonTitle.trim(),
      videoUrl: newLessonVideoUrl.trim() || "https://www.youtube.com/watch?v=kCc8FmEb1nY",
      pdfUrl: newLessonPdfUrl.trim() || "https://yukta.edu/slides/new-unit.pdf",
      description: newLessonDescription.trim() || "Unit technical specification and laboratory derivations.",
      durationMinutes: 50,
      tags: newLessonTags.split(",").map(t => t.trim()).filter(Boolean),
      readings: newLessonReadings.trim() || "Prescribed literature citation."
    }

    setLessons([...lessons, newObj])
    setShowLessonModal(false)
    setNewLessonTitle("")
    setNewLessonVideoUrl("")
    setNewLessonPdfUrl("")
    setNewLessonDescription("")
    setNewLessonTags("")
    setNewLessonReadings("")
    showToast(`Lesson "${newObj.title}" successfully added to course structure.`)
  }

  const handleRemoveLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id))
    showToast("Lesson removed from curriculum draft.")
  }

  const handleAddQuizQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQText.trim()) return

    const newQ: QuizDraftQuestion = {
      id: `q-${Date.now()}`,
      type: newQType,
      question: newQText.trim(),
      options: newQType === "MCQ" ? newQOptions.split(",").map(o => o.trim()).filter(Boolean) : newQType === "True/False" ? ["True", "False"] : undefined,
      correctAnswer: newQCorrect.trim() || (newQType === "True/False" ? "True" : "Correct answer specification"),
      explanation: newQExplanation.trim() || "Explanation verifying conceptual accuracy."
    }

    setQuizQuestions([...quizQuestions, newQ])
    setShowQuizModal(false)
    setNewQText("")
    setNewQOptions("Option A, Option B, Option C, Option D")
    setNewQCorrect("")
    setNewQExplanation("")
    showToast("Quiz assessment question added successfully.")
  }

  const handleRemoveQuizQuestion = (id: string) => {
    setQuizQuestions(quizQuestions.filter(q => q.id !== id))
    showToast("Quiz question removed.")
  }

  const handleSubmitAudit = () => {
    showToast(`Curriculum ${courseCode} submitted to the Academic Review Board for Autumn 2026 accreditation.`)
  }

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
                  CURRICULUM SPECIFICATION AUTHORING
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Author &amp; Architect Laboratory Curriculum
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
                Define learning outcomes, upload video lectures, establish course prerequisites, compile interactive quizzes, and schedule supercomputing cluster quotas.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleSubmitAudit}
                className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer"
              >
                Submit for Academic Audit →
              </button>
            </div>
          </div>

          {/* Tab Navigation Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-8 border-t border-black/[0.04] mt-8 no-scrollbar">
            {[
              { id: "curriculum", label: "1. Course Specification & Prerequisites", icon: "📐" },
              { id: "lessons", label: `2. Lesson Modules & Video Uploads (${lessons.length})`, icon: "🎥" },
              { id: "quiz", label: `3. Quiz Builder & Assessments (${quizQuestions.length})`, icon: "✍️" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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

        {/* ========================================================================= */}
        {/* TAB 1: COURSE SPECIFICATION & PREREQUISITES */}
        {/* ========================================================================= */}
        {activeTab === "curriculum" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10 space-y-6 max-w-4xl animate-fade-in">
            <div className="border-b border-black/[0.04] pb-4">
              <h2 className="text-xl font-bold text-[#111827] tracking-tight">Accreditation Metadata &amp; Prerequisites</h2>
              <p className="text-xs text-gray-500 mt-0.5">Specify institutional requirements, credit allocations, and technical background.</p>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Course Code & Identifier"
                  required
                  value={courseCode}
                  onChange={e => setCourseCode(e.target.value)}
                  className="font-mono"
                  placeholder="e.g. CS-810"
                />

                <Input
                  label="Department / Research Division"
                  required
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  placeholder="e.g. Distributed Systems"
                />
              </div>

              <Input
                label="Full Official Curriculum Title"
                required
                value={courseTitle}
                onChange={e => setCourseTitle(e.target.value)}
                placeholder="e.g. Distributed Graph Neural Networks"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Accredited ECTS Units"
                  value={credits}
                  onChange={e => setCredits(e.target.value)}
                  placeholder="e.g. 4.0 ECTS"
                />

                <Input
                  label="Duration in Weeks"
                  value={durationWeeks}
                  onChange={e => setDurationWeeks(e.target.value)}
                  placeholder="e.g. 14 Weeks"
                />

                <Input
                  label="Allocated GPU Hours per Scholar"
                  value={gpuHours}
                  onChange={e => setGpuHours(e.target.value)}
                  placeholder="e.g. 80 GPU Hours"
                />
              </div>

              <div className="space-y-1">
                <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Academic Prerequisites &amp; Corequisites
                </label>
                <input
                  type="text"
                  value={prerequisites}
                  onChange={e => setPrerequisites(e.target.value)}
                  placeholder="e.g. CS-704, Multivariable Calculus, CUDA C++"
                  className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 text-xs text-[#111827] focus:outline-none focus:border-[#00694f]"
                />
                <p className="text-[11px] text-gray-400">Comma-separated course codes or background qualifications required for enrollment.</p>
              </div>

              <div className="space-y-1">
                <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Curriculum Overview &amp; Learning Outcomes
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe technical outcomes, mathematical derivations, and laboratory capstones..."
                  className="w-full rounded-xl border border-black/[0.08] bg-white p-4 text-xs text-[#111827] focus:outline-none focus:border-[#00694f] leading-relaxed"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab("lessons")}
                  className="py-2.5 px-6 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer"
                >
                  Proceed to Lesson Uploads →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LESSON MODULES & VIDEO UPLOADS */}
        {/* ========================================================================= */}
        {activeTab === "lessons" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.04] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight">Curriculum Lesson Modules &amp; Video Embeds</h2>
                <p className="text-xs text-gray-500">Order lecture sequences, embed video recordings, attach PDF slides, and define topic tags.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowLessonModal(true)}
                className="py-2.5 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer"
              >
                + Upload / Add New Lesson
              </button>
            </div>

            {/* Lesson Cards */}
            <div className="space-y-4">
              {lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="p-6 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-4 text-xs"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#00694f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        Unit {idx + 1}
                      </span>
                      <span className="text-gray-400 font-mono text-[11px]">{lesson.durationMinutes} mins</span>
                      <div className="flex items-center gap-1.5">
                        {lesson.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-[10px] font-mono text-gray-700">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-gray-900">{lesson.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{lesson.description}</p>

                    <div className="pt-1 flex flex-wrap items-center gap-4 text-[11px] font-mono text-gray-500">
                      <span>Video: <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="text-[#00694f] underline truncate max-w-xs">{lesson.videoUrl}</a></span>
                      <span>PDF: <a href={lesson.pdfUrl} target="_blank" rel="noreferrer" className="text-[#00694f] underline">Slides Document</a></span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveLesson(lesson.id)}
                    className="py-2 px-3 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-xs transition-all cursor-pointer shrink-0 self-end md:self-auto"
                  >
                    Delete Lesson
                  </button>
                </div>
              ))}
            </div>

            {/* Upload Lesson Modal */}
            {showLessonModal && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xl p-8 max-w-lg w-full space-y-6 animate-scale-up">
                  <div className="flex justify-between items-center border-b border-black/[0.04] pb-3">
                    <h3 className="font-bold text-lg text-gray-900">Upload &amp; Author Lesson Module</h3>
                    <button
                      type="button"
                      onClick={() => setShowLessonModal(false)}
                      className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleAddLesson} className="space-y-4">
                    <Input
                      label="Lesson Title & Unit Number"
                      required
                      value={newLessonTitle}
                      onChange={e => setNewLessonTitle(e.target.value)}
                      placeholder="e.g. Unit 3: Blocked Matrix Multiplication with Triton"
                    />

                    <Input
                      label="Video Stream URL (YouTube Embed or MP4)"
                      value={newLessonVideoUrl}
                      onChange={e => setNewLessonVideoUrl(e.target.value)}
                      placeholder="e.g. https://www.youtube.com/watch?v=..."
                    />

                    <Input
                      label="PDF Slides or Reading URL"
                      value={newLessonPdfUrl}
                      onChange={e => setNewLessonPdfUrl(e.target.value)}
                      placeholder="e.g. https://yukta.edu/slides/unit3.pdf"
                    />

                    <Input
                      label="Topic Tags (comma-separated)"
                      value={newLessonTags}
                      onChange={e => setNewLessonTags(e.target.value)}
                      placeholder="e.g. CUDA, Triton, GPU Kernels"
                    />

                    <div className="space-y-1">
                      <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                        Lesson Overview / Description
                      </label>
                      <textarea
                        rows={3}
                        value={newLessonDescription}
                        onChange={e => setNewLessonDescription(e.target.value)}
                        placeholder="Explain instructional scope and laboratory goals..."
                        className="w-full rounded-xl border border-black/[0.08] bg-white p-3 text-xs text-[#111827] focus:outline-none focus:border-[#00694f]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowLessonModal(false)}
                        className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium shadow-sm cursor-pointer"
                      >
                        Add to Curriculum
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: QUIZ BUILDER & ASSESSMENTS */}
        {/* ========================================================================= */}
        {activeTab === "quiz" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.04] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight">Interactive Quiz &amp; Conceptual Assessment Builder</h2>
                <p className="text-xs text-gray-500">Design Multiple Choice (MCQ), True/False, and Short-Answer questions with automated evaluation.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowQuizModal(true)}
                className="py-2.5 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer"
              >
                + Add Quiz Question
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {quizQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-6 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-4 text-xs"
                >
                  <div className="space-y-2.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#00694f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        Q{idx + 1} • {q.type}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 leading-snug">{q.question}</h4>

                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border text-xs ${
                              opt === q.correctAnswer
                                ? "bg-emerald-50 border-emerald-300 text-[#00694f] font-semibold"
                                : "bg-white border-gray-200 text-gray-700"
                            }`}
                          >
                            <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="p-3 bg-white rounded-xl border border-gray-200/80 text-[11px] text-gray-700 leading-relaxed">
                      <strong className="text-emerald-800">Explanation for Students:</strong> {q.explanation}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveQuizQuestion(q.id)}
                    className="py-2 px-3 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-xs transition-all cursor-pointer shrink-0 self-end md:self-auto"
                  >
                    Delete Question
                  </button>
                </div>
              ))}
            </div>

            {/* Quiz Modal */}
            {showQuizModal && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xl p-8 max-w-lg w-full space-y-6 animate-scale-up">
                  <div className="flex justify-between items-center border-b border-black/[0.04] pb-3">
                    <h3 className="font-bold text-lg text-gray-900">Add Assessment Question</h3>
                    <button
                      type="button"
                      onClick={() => setShowQuizModal(false)}
                      className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleAddQuizQuestion} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                        Question Format
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["MCQ", "True/False", "Short-Answer"] as const).map(fmt => (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => setNewQType(fmt)}
                            className={`py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                              newQType === fmt
                                ? "bg-[#00694f] text-white border-[#00694f] font-semibold"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                        Question Prompt
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={newQText}
                        onChange={e => setNewQText(e.target.value)}
                        placeholder="Enter the mathematical or conceptual question..."
                        className="w-full rounded-xl border border-black/[0.08] bg-white p-3 text-xs text-[#111827] focus:outline-none focus:border-[#00694f]"
                      />
                    </div>

                    {newQType === "MCQ" && (
                      <Input
                        label="Options (comma-separated)"
                        value={newQOptions}
                        onChange={e => setNewQOptions(e.target.value)}
                        placeholder="Option 1, Option 2, Option 3, Option 4"
                      />
                    )}

                    <Input
                      label="Correct Answer Key"
                      required
                      value={newQCorrect}
                      onChange={e => setNewQCorrect(e.target.value)}
                      placeholder={newQType === "True/False" ? "True or False" : "Exact matching answer string"}
                    />

                    <div className="space-y-1">
                      <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                        Pedagogical Explanation
                      </label>
                      <textarea
                        rows={2}
                        value={newQExplanation}
                        onChange={e => setNewQExplanation(e.target.value)}
                        placeholder="Explain why this answer is mathematically / technically valid..."
                        className="w-full rounded-xl border border-black/[0.08] bg-white p-3 text-xs text-[#111827] focus:outline-none focus:border-[#00694f]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowQuizModal(false)}
                        className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium shadow-sm cursor-pointer"
                      >
                        Save Question
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Curriculum Specification Studio
      </footer>
    </div>
  )
}
