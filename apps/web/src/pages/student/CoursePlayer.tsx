import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Header } from "../../components/Header"

interface Lesson {
  id: string
  title: string
  duration: string
  type: "lecture" | "lab" | "seminar"
  youtubeVideoId: string
  summary: string
  readingCitation: string
  gitRepo: string
  slidesUrl: string
}

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const LESSONS: Lesson[] = [
  {
    id: "lec-1",
    title: "1.1 Geometric Interpretations of Attention Projections",
    duration: "52m",
    type: "lecture",
    youtubeVideoId: "kCc8FmEb1nY", // Andrej Karpathy building micrograd / transformers or similar deep dive
    summary: "Mathematical foundations of QKV vector projections, attention softmax geometry, and dimensional scaling factors.",
    readingCitation: "Vaswani et al. (2017). 'Attention Is All You Need'. NeurIPS.",
    gitRepo: "git clone https://gitlab.yukta.edu/cs704/attention-geometry.git",
    slidesUrl: "https://yukta.edu/curriculum/cs704/slides-unit1.1.pdf"
  },
  {
    id: "lec-2",
    title: "1.2 Rotary and Relative Positional Encodings (RoPE / ALiBi)",
    duration: "48m",
    type: "lecture",
    youtubeVideoId: "bQ5BoolX9Ag",
    summary: "Complex vector rotations in 2D subspaces, inner product invariance, and length extrapolation mechanics.",
    readingCitation: "Su et al. (2024). 'RoFormer: Enhanced Transformer with Rotary Position Embedding'. Neurocomputing.",
    gitRepo: "git clone https://gitlab.yukta.edu/cs704/rope-rotations.git",
    slidesUrl: "https://yukta.edu/curriculum/cs704/slides-unit1.2.pdf"
  },
  {
    id: "lec-3",
    title: "1.3 Memory Complexity: HBM Bandwidth Bounds and IO-Aware Attention",
    duration: "64m",
    type: "lecture",
    youtubeVideoId: "g0V_AZPnpMA",
    summary: "High Bandwidth Memory (HBM) vs SRAM access ceilings, roofline model derivations, and tiling algorithms.",
    readingCitation: "Dao et al. (2022). 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness'. NeurIPS.",
    gitRepo: "git clone https://gitlab.yukta.edu/cs704/flashattention-tiling.git",
    slidesUrl: "https://yukta.edu/curriculum/cs704/slides-unit1.3.pdf"
  },
  {
    id: "lec-4",
    title: "1.4 Laboratory 1: Writing a Blocked Attention Kernel in PyTorch & Triton",
    duration: "90m",
    type: "lab",
    youtubeVideoId: "l8pRSuU81PU",
    summary: "Hands-on implementation of online softmax calculation, tile outer-loop scheduling, and backward pass recomputation.",
    readingCitation: "Triton Compiler Documentation & CUDA C++ Programming Guide (v12.6).",
    gitRepo: "git clone https://gitlab.yukta.edu/cs704/triton-kernel-lab1.git",
    slidesUrl: "https://yukta.edu/curriculum/cs704/lab1-specification.pdf"
  }
]

const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  "lec-1": [
    {
      id: 1,
      question: "Why is the dot-product of query and key vectors divided by sqrt(d_k) before applying the softmax operator?",
      options: [
        "To normalize vector lengths to unit hyperspheres.",
        "To counteract the growth of dot product variance in high dimensions, preventing vanishing softmax gradients.",
        "To enforce non-negative attention weights prior to exponentiation.",
        "To enable matrix multiplication parallelization across CUDA warps."
      ],
      correctIndex: 1,
      explanation: "For large d_k, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients. Dividing by sqrt(d_k) stabilizes the variance to 1."
    },
    {
      id: 2,
      question: "What is the computational complexity of standard self-attention with respect to sequence length N?",
      options: [
        "O(N) linear time and space.",
        "O(N log N) quasi-linear time.",
        "O(N^2) quadratic time and space.",
        "O(N^3) cubic time due to matrix inversion."
      ],
      correctIndex: 2,
      explanation: "Computing the N x N attention weight matrix requires N^2 dot products, yielding quadratic O(N^2) time and space complexity."
    }
  ],
  "lec-3": [
    {
      id: 1,
      question: "What is the primary bottleneck in standard Multi-Head Attention execution on modern GPUs (e.g. NVIDIA A100/H100)?",
      options: [
        "Compute tensor core FLOPS limitation.",
        "Memory bandwidth (IO bound) due to reading and writing the intermediate N x N attention matrix to HBM.",
        "Host-to-device PCIe transfer latency.",
        "Integer address arithmetic overhead."
      ],
      correctIndex: 1,
      explanation: "Standard attention repeatedly materializes the intermediate N x N matrix to High Bandwidth Memory (HBM). FlashAttention fuses operations in fast on-chip SRAM to circumvent HBM memory bandwidth ceilings."
    },
    {
      id: 2,
      question: "How does FlashAttention avoid storing the full N x N attention matrix during the forward pass for backward computation?",
      options: [
        "It stores only the diagonal elements.",
        "It stores the softmax normalizers (row sum and max) and recomputes the attention tiles on-the-fly in backward pass.",
        "It quantizes the attention weights to 1-bit integers.",
        "It uses random projection hashing to approximate gradients."
      ],
      correctIndex: 1,
      explanation: "FlashAttention saves only the softmax normalization statistics (scalars per row) and recomputes attention blocks in fast SRAM during backpropagation, yielding massive speedups."
    }
  ]
}

type PlayerTab = "quiz" | "notes" | "resources" | "colloquium"

export const CoursePlayer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()

  const [activeLessonIdx, setActiveLessonIdx] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>(["lec-1"])
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>(["lec-3"])
  const [activeTab, setActiveTab] = useState<PlayerTab>("notes")
  
  // Notes State
  const [notes, setNotes] = useState<string>(
    "# Personal Research & Lab Notes\n\n- FlashAttention IO bound derivation: Roofline analysis on H100 SXM5 with 3.35 TB/s HBM3 memory bandwidth.\n- Online softmax trick avoids allocating NxN global memory buffer by updating running maximum `m_new = max(m_prev, x)` and scaling previous accumulator."
  )
  const [saveStatus, setSaveStatus] = useState<string>("Saved to Cloud")

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)

  const currentLesson = LESSONS[activeLessonIdx] || LESSONS[0]
  const currentQuiz = QUIZ_QUESTIONS[currentLesson.id] || QUIZ_QUESTIONS["lec-1"]

  const toggleComplete = (id: string) => {
    if (completedLessons.includes(id)) {
      setCompletedLessons(completedLessons.filter(item => item !== id))
    } else {
      setCompletedLessons([...completedLessons, id])
    }
  }

  const toggleBookmark = (id: string) => {
    if (bookmarkedLessons.includes(id)) {
      setBookmarkedLessons(bookmarkedLessons.filter(item => item !== id))
    } else {
      setBookmarkedLessons([...bookmarkedLessons, id])
    }
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
    setSaveStatus("Saving...")
    setTimeout(() => setSaveStatus("Saved to Cloud"), 400)
  }

  const handleSelectQuizAnswer = (qId: number, optIdx: number) => {
    if (quizSubmitted) return
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIdx })
  }

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault()
    let correct = 0
    currentQuiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++
      }
    })
    const scorePct = Math.round((correct / currentQuiz.length) * 100)
    setQuizScore(scorePct)
    setQuizSubmitted(true)
  }

  const handleRetakeQuiz = () => {
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setQuizScore(null)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#111827] flex flex-col justify-between font-sans selection:bg-[#00694f] selection:text-white">
      <Header />

      {/* Top Navigation & Workspace Header */}
      <div className="border-b border-black/[0.04] bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <Link to="/student/dashboard" className="font-semibold text-[#00694f] hover:underline flex items-center gap-1">
              <span>← Student Console</span>
            </Link>
            <span className="text-gray-300">/</span>
            <span className="font-mono font-bold text-gray-900 bg-gray-50 border border-gray-200/60 px-2 py-0.5 rounded-md">
              {courseId?.toUpperCase() || "CS-704"}
            </span>
            <span className="text-gray-600 font-medium truncate max-w-xs sm:max-w-md">
              {currentLesson.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Bookmark Lesson Button */}
            <button
              type="button"
              onClick={() => toggleBookmark(currentLesson.id)}
              className={`py-2 px-3.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                bookmarkedLessons.includes(currentLesson.id)
                  ? "bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs font-semibold"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{bookmarkedLessons.includes(currentLesson.id) ? "★" : "☆"}</span>
              <span>{bookmarkedLessons.includes(currentLesson.id) ? "Bookmarked ✓" : "Bookmark Lesson"}</span>
            </button>

            {/* Mark Completed Toggle */}
            <button
              type="button"
              onClick={() => toggleComplete(currentLesson.id)}
              className={`py-2 px-4 rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                completedLessons.includes(currentLesson.id)
                  ? "bg-emerald-50 text-[#00694f] border border-emerald-200 font-semibold"
                  : "bg-[#00694f] hover:bg-[#00523e] text-white"
              }`}
            >
              <span>{completedLessons.includes(currentLesson.id) ? "✓" : "○"}</span>
              <span>{completedLessons.includes(currentLesson.id) ? "Unit Completed" : "Mark Completed"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Classroom Grid */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Stage: Video Theatre & Workspace (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Responsive YouTube / Lecture Video Player */}
            <div className="bg-black rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${currentLesson.youtubeVideoId}?rel=0&modestbranding=1&autoplay=0`}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Lesson Metadata Ribbon */}
              <div className="p-6 bg-white border-t border-black/[0.04] flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#00694f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                      {currentLesson.type}
                    </span>
                    <span className="font-mono text-xs text-gray-400">Duration: {currentLesson.duration}</span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">
                    {currentLesson.title}
                  </h1>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                    {currentLesson.summary}
                  </p>
                </div>

                <div className="text-right font-mono text-xs text-gray-400 shrink-0 self-start sm:self-auto">
                  <span>Classroom: </span>
                  <strong className="text-gray-800">Turing-Live</strong>
                </div>
              </div>
            </div>

            {/* Interactive Workspace Tabs */}
            <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-black/[0.04] pb-4 overflow-x-auto no-scrollbar">
                {(
                  [
                    { id: "quiz", label: "Quiz Engine & Assessment", icon: "✍️" },
                    { id: "notes", label: `Lab Scratchpad (${saveStatus})`, icon: "📝" },
                    { id: "resources", label: "Curriculum Resources & Git", icon: "📦" },
                    { id: "colloquium", label: "Lesson Discussion", icon: "💬" },
                  ] as { id: PlayerTab; label: string; icon: string }[]
                ).map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-[#00694f] text-white shadow-xs font-semibold"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* TAB 1: QUIZ ENGINE */}
              {activeTab === "quiz" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.04] pb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Unit Conceptual Mastery &amp; Knowledge Verification</h3>
                      <p className="text-xs text-gray-500">Attempt these technical comprehension questions to validate your mathematical understanding.</p>
                    </div>
                    {quizScore !== null && (
                      <div className={`font-mono text-xs px-3 py-1 rounded-xl font-bold ${
                        quizScore >= 70 ? "bg-emerald-50 text-[#00694f] border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        Score: {quizScore}% {quizScore >= 70 ? "PASSED ✓" : "REVISE"}
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmitQuiz} className="space-y-6">
                    {currentQuiz.map((q, idx) => {
                      const userChoice = selectedAnswers[q.id]
                      const isCorrect = userChoice === q.correctIndex
                      return (
                        <div key={q.id} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-3">
                          <div className="font-semibold text-gray-900 text-xs leading-relaxed flex items-start gap-2">
                            <span className="font-mono text-[#00694f] font-bold">Q{idx + 1}.</span>
                            <span>{q.question}</span>
                          </div>

                          <div className="space-y-2">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = userChoice === optIdx
                              let optStyles = "bg-white border-gray-200 text-gray-700 hover:bg-gray-100/50"
                              if (quizSubmitted) {
                                if (optIdx === q.correctIndex) {
                                  optStyles = "bg-emerald-50 border-emerald-300 text-[#00694f] font-semibold"
                                } else if (isSelected && !isCorrect) {
                                  optStyles = "bg-red-50 border-red-300 text-red-700 line-through"
                                }
                              } else if (isSelected) {
                                optStyles = "bg-emerald-50 border-[#00694f] text-[#00694f] font-semibold"
                              }

                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  disabled={quizSubmitted}
                                  onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center gap-3 cursor-pointer ${optStyles}`}
                                >
                                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono shrink-0 ${
                                    isSelected ? "bg-[#00694f] text-white border-[#00694f]" : "border-gray-300 text-gray-500"
                                  }`}>
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span className="leading-snug">{opt}</span>
                                </button>
                              )
                            })}
                          </div>

                          {/* Explanation Card upon submission */}
                          {quizSubmitted && (
                            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 ${
                              isCorrect ? "bg-emerald-50/50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-900"
                            }`}>
                              <div className="font-bold flex items-center gap-1.5 font-mono text-[11px]">
                                <span>{isCorrect ? "✓ Correct Analysis:" : "⚠ Conceptual Clarification:"}</span>
                              </div>
                              <p className="text-[11px]">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}

                    <div className="pt-2 flex justify-between items-center">
                      {quizSubmitted ? (
                        <button
                          type="button"
                          onClick={handleRetakeQuiz}
                          className="py-2.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium transition-all cursor-pointer"
                        >
                          ↻ Retake Assessment
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={Object.keys(selectedAnswers).length < currentQuiz.length}
                          className="py-2.5 px-6 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                        >
                          Submit &amp; Evaluate Answers
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: NOTES SCRATCHPAD */}
              {activeTab === "notes" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-mono text-[11px]">Markdown derivations supported. Auto-saves to scholar profile.</span>
                    <span className="font-mono text-emerald-700 font-semibold">{saveStatus}</span>
                  </div>
                  <textarea
                    rows={8}
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Enter personal mathematical derivations, Triton kernel code sketches, or benchmark profiling notes..."
                    className="w-full rounded-2xl border border-black/[0.08] bg-gray-50/50 p-4 text-xs font-mono text-[#111827] focus:outline-none focus:border-[#00694f] focus:bg-white leading-relaxed transition-all"
                  />
                </div>
              )}

              {/* TAB 3: CURRICULUM RESOURCES */}
              {activeTab === "resources" && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="font-bold text-gray-900">Official Seminar Git Repository</div>
                    <div className="p-3 bg-white rounded-xl border border-gray-200/80 font-mono text-[#00694f] text-[11px]">
                      {currentLesson.gitRepo}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="font-bold text-gray-900">Primary Literature Reading</div>
                    <p className="text-gray-600 italic">{currentLesson.readingCitation}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900">Lecture Slide Deck (PDF)</div>
                      <div className="text-gray-500 text-[11px]">Unit slides and mathematical proofs</div>
                    </div>
                    <a
                      href={currentLesson.slidesUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3.5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-medium"
                    >
                      Download Slides ↓
                    </a>
                  </div>
                </div>
              )}

              {/* TAB 4: LESSON COLLOQUIUM */}
              {activeTab === "colloquium" && (
                <div className="p-8 text-center space-y-3 animate-fade-in">
                  <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                    Have questions regarding {currentLesson.title}? Connect with Dr. Ananya Sharma, teaching fellows, and fellow scholars on the colloquium topic.
                  </p>
                  <Link
                    to="/discussion"
                    className="inline-block py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium shadow-sm transition-all"
                  >
                    Open Unit Discussion Thread →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Syllabus Drawer & Progress (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-4">
              <div className="border-b border-black/[0.04] pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#00694f] uppercase tracking-wider font-mono">SYLLABUS</span>
                  <h2 className="text-lg font-bold text-[#111827] tracking-tight mt-0.5">
                    Instructional Units
                  </h2>
                </div>
                <span className="font-mono text-xs text-gray-500 font-semibold">
                  {completedLessons.length}/{LESSONS.length} Done
                </span>
              </div>

              <div className="space-y-2.5">
                {LESSONS.map((lesson, idx) => {
                  const isActive = idx === activeLessonIdx
                  const isDone = completedLessons.includes(lesson.id)
                  const isBookmarked = bookmarkedLessons.includes(lesson.id)

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLessonIdx(idx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                        isActive
                          ? "border-[#00694f] bg-emerald-50/40 shadow-xs"
                          : "border-gray-100 bg-gray-50/70 hover:bg-gray-100/60"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-gray-400">
                            Unit {idx + 1}
                          </span>
                          {isBookmarked && (
                            <span className="text-amber-500 font-bold text-[10px]">★ Saved</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-gray-400 text-[11px]">{lesson.duration}</span>
                          {isDone ? (
                            <span className="text-[#00694f] font-bold text-[11px]">✓</span>
                          ) : (
                            <span className="w-2 h-2 rounded-full border border-gray-300" />
                          )}
                        </div>
                      </div>
                      <div className={`text-xs font-semibold leading-snug ${isActive ? "text-[#00694f]" : "text-gray-900"}`}>
                        {lesson.title}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Scholar Academic Classroom
      </footer>
    </div>
  )
}
