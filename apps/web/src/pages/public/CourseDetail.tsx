import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { AIAssistChip } from "../../components/ui/AIAssistChip"
import { Button } from "../../components/ui/Button"

interface SyllabusModule {
  id: string
  number: string
  title: string
  durationHours: number
  lectureCount: number
  description: string
  lectures: {
    id: string
    title: string
    duration: string
    type: "lecture" | "lab" | "seminar"
  }[]
  readings: {
    citation: string
    source: string
  }[]
  deliverable: string
}

const SYLLABUS_MODULES: SyllabusModule[] = [
  {
    id: "mod-1",
    number: "01",
    title: "High-Dimensional Representations and Attention Mechanics",
    durationHours: 18,
    lectureCount: 5,
    description: "Mathematical foundations of dense sequence representations, softmax attention geometry, rotary positional encodings, and key-value cache memory bottlenecks.",
    lectures: [
      { id: "lec-1-1", title: "Sequence Projections and Geometric Interpretations of Attention", duration: "52m", type: "lecture" },
      { id: "lec-1-2", title: "Rotary and Relative Positional Encodings (RoPE / ALiBi)", duration: "48m", type: "lecture" },
      { id: "lec-1-3", title: "Memory Complexity: HBM Bandwidth Bounds and IO-Aware Attention", duration: "64m", type: "lecture" },
      { id: "lec-1-4", title: "Laboratory 1: Writing a Blocked Attention Kernel in PyTorch", duration: "90m", type: "lab" },
      { id: "lec-1-5", title: "Seminar: Review of FlashAttention-3 and Triton Implementations", duration: "45m", type: "seminar" },
    ],
    readings: [
      { citation: "Dao, T. (2024). FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning. ICLR.", source: "arXiv:2307.08691" },
      { citation: "Su, J. et al. (2024). RoFormer: Enhanced Transformer with Rotary Position Embedding. Neurocomputing.", source: "DOI:10.1016/j.neucom.2023.127063" },
    ],
    deliverable: "Kernel Benchmark Notebook with KV-cache latency profiling under context lengths up to 32k tokens."
  },
  {
    id: "mod-2",
    number: "02",
    title: "Distributed Training and Collective Communication Protocols",
    durationHours: 24,
    lectureCount: 6,
    description: "Inter-node communication topologies, AllReduce algorithms, pipeline schedules (1F1B), and memory partitioning via ZeRO stages 1 through 3.",
    lectures: [
      { id: "lec-2-1", title: "Hardware Interconnects: NVLink, NVSwitch, and InfiniBand Architecture", duration: "55m", type: "lecture" },
      { id: "lec-2-2", title: "Data Parallelism, Sharded Optimizers, and ZeRO Stage Mechanics", duration: "70m", type: "lecture" },
      { id: "lec-2-3", title: "Tensor Parallelism: Megatron-LM Matrix Decomposition", duration: "65m", type: "lecture" },
      { id: "lec-2-4", title: "Pipeline Parallelism: Interleaved 1F1B Bubble Minimization", duration: "50m", type: "lecture" },
      { id: "lec-2-5", title: "Laboratory 2: Multi-GPU Cluster Setup and Fault Tolerance Simulation", duration: "110m", type: "lab" },
      { id: "lec-2-6", title: "Colloquium: Troubleshooting Stragglers and Hardware Degradation at Scale", duration: "45m", type: "seminar" },
    ],
    readings: [
      { citation: "Rajbhandari, S. et al. (2020). ZeRO: Memory Optimizations Toward Training Trillion Parameter Models. SC'20.", source: "ACM IEEE Supercomputing" },
      { citation: "Shoeybi, M. et al. (2020). Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism.", source: "arXiv:1909.08053" },
    ],
    deliverable: "Distributed training run orchestration script with automatic checkpoint recovery and throughput logging."
  },
  {
    id: "mod-3",
    number: "03",
    title: "Quantization, Low-Rank Adaptation, and Sparse Representations",
    durationHours: 20,
    lectureCount: 5,
    description: "Post-training quantization (PTQ) vs Quantization-Aware Training (QAT), FP8 GEMM kernels, LoRA low-rank decomposition, and mixture-of-experts routing.",
    lectures: [
      { id: "lec-3-1", title: "Numerical Precisions: IEEE 754, BF16, and Microscaled FP8 / FP4", duration: "58m", type: "lecture" },
      { id: "lec-3-2", title: "Parameter-Efficient Fine-Tuning: LoRA, DoRA, and QLoRA Math", duration: "62m", type: "lecture" },
      { id: "lec-3-3", title: "Sparse Mixture-of-Experts: Gating Networks and Load Balancing Loss", duration: "68m", type: "lecture" },
      { id: "lec-3-4", title: "Laboratory 3: Fine-Tuning a 7B Parameter Architecture on a Single 24GB GPU", duration: "95m", type: "lab" },
      { id: "lec-3-5", title: "Seminar: Weight Distribution Outliers and SmoothQuant Strategies", duration: "40m", type: "seminar" },
    ],
    readings: [
      { citation: "Hu, E. J. et al. (2022). LoRA: Low-Rank Adaptation of Large Language Models. ICLR.", source: "OpenReview:nZeVKeeFYf9" },
      { citation: "Dettmers, T. et al. (2023). QLoRA: Efficient Finetuning of Quantized LLMs. NeurIPS.", source: "arXiv:2305.14314" },
    ],
    deliverable: "Quantized model weights repository with perplexity evaluations compared against full-precision checkpoints."
  },
  {
    id: "mod-4",
    number: "04",
    title: "Inference Serving Systems and Production Latency Budgets",
    durationHours: 26,
    lectureCount: 6,
    description: "Continuous batching engines, PagedAttention virtual memory systems, speculative decoding verification, and production latency optimization.",
    lectures: [
      { id: "lec-4-1", title: "Batching Strategies: Static vs Cellular Continuous Batching", duration: "60m", type: "lecture" },
      { id: "lec-4-2", title: "PagedAttention and Virtual Memory Management in GPU VRAM", duration: "65m", type: "lecture" },
      { id: "lec-4-3", title: "Speculative Decoding: Draft Models and Acceptance Probability Proofs", duration: "55m", type: "lecture" },
      { id: "lec-4-4", title: "Serving Stack Architecture: vLLM, TensorRT-LLM, and Triton Inference Server", duration: "72m", type: "lecture" },
      { id: "lec-4-5", title: "Laboratory 4: Deploying a Multi-Tenant Serving Gateway with SLA Limits", duration: "120m", type: "lab" },
      { id: "lec-4-6", title: "Case Study: Production Failure Modes in Real-Time Conversational Systems", duration: "50m", type: "seminar" },
    ],
    readings: [
      { citation: "Kwon, W. et al. (2023). Efficient Memory Management for Large Language Model Serving with PagedAttention. SOSP.", source: "ACM SIGOPS" },
      { citation: "Leviathan, Y. et al. (2023). Fast Inference from Transformers via Speculative Decoding. ICML.", source: "PMLR 202:19274-19286" },
    ],
    deliverable: "Load-tested inference microservice deployed on the student cluster with P99 latency under 45ms per token."
  },
  {
    id: "mod-5",
    number: "05",
    title: "Evaluative Alignment, Guardrails, and Safety Verification",
    durationHours: 24,
    lectureCount: 5,
    description: "Reinforcement learning from human and rule feedback (RLHF/RLAIF), Direct Preference Optimization (DPO), and empirical safety red-teaming.",
    lectures: [
      { id: "lec-5-1", title: "Preference Optimization: Bradley-Terry Models, PPO, and DPO Foundations", duration: "65m", type: "lecture" },
      { id: "lec-5-2", title: "Safety Calibration: Refusal Mechanics and Jailbreak Surface Analysis", duration: "58m", type: "lecture" },
      { id: "lec-5-3", title: "Automated Evaluation Frameworks: LLM-as-a-Judge and Benchmark Contamination", duration: "52m", type: "lecture" },
      { id: "lec-5-4", title: "Laboratory 5: Building an Audited Alignment Pipeline with Custom DPO Loss", duration: "105m", type: "lab" },
      { id: "lec-5-5", title: "Capstone Defense: Group Presentations to the Academic Review Committee", duration: "90m", type: "seminar" },
    ],
    readings: [
      { citation: "Rafailov, R. et al. (2023). Direct Preference Optimization: Your Language Model is Secretly a Reward Model. NeurIPS.", source: "arXiv:2305.18290" },
      { citation: "Bai, Y. et al. (2022). Constitutional AI: Harmlessness from AI Feedback. Anthropic Technical Report.", source: "arXiv:2212.08073" },
    ],
    deliverable: "Comprehensive Capstone Technical Report, model checkpoints, alignment benchmark report, and live demo."
  }
]

export const CourseDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"syllabus" | "lab-specs" | "faculty" | "prerequisites">("syllabus")
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ "mod-1": true })
  const [selectedTrack, setSelectedTrack] = useState<"audit" | "accredited">("accredited")
  const [syllabusSearch, setSyllabusSearch] = useState("")
  
  // Interactive prerequisite self-checker
  const [quizState, setQuizState] = useState({
    linearAlgebra: true,
    pythonAsync: true,
    cudaBasics: false,
    deepLearning: true,
  })

  // Modal dialog states for real legal & academic documents
  const [showTosModal, setShowTosModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [syllabusExported, setSyllabusExported] = useState(false)
  const [enrolledNotice, setEnrolledNotice] = useState<string | null>(null)

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const expandAllModules = () => {
    const all: Record<string, boolean> = {}
    SYLLABUS_MODULES.forEach((m) => { all[m.id] = true })
    setExpandedModules(all)
  }

  const collapseAllModules = () => {
    setExpandedModules({})
  }

  const filteredModules = SYLLABUS_MODULES.filter((mod) => {
    if (!syllabusSearch.trim()) return true
    const q = syllabusSearch.toLowerCase()
    return (
      mod.title.toLowerCase().includes(q) ||
      mod.description.toLowerCase().includes(q) ||
      mod.lectures.some((l) => l.title.toLowerCase().includes(q)) ||
      mod.deliverable.toLowerCase().includes(q)
    )
  })

  // Prerequisite assessment calculation
  const totalPrereqs = 4
  const checkedPrereqs = Object.values(quizState).filter(Boolean).length
  const isPrereqReady = checkedPrereqs >= 3

  const handleEnrollAction = () => {
    if (selectedTrack === "audit") {
      setEnrolledNotice("Your open academic audit registration is active. Course materials and public repositories are now accessible in your student workspace.")
    } else {
      setEnrolledNotice("Registration submitted for the Autumn 2026 Accredited Cohort. Your academic department coordinator will verify departmental eligibility within 2 business days.")
    }
  }

  const handleExportSyllabus = () => {
    setSyllabusExported(true)
    setTimeout(() => setSyllabusExported(false), 4000)
  }

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Institutional Top Header */}
      <Header />

      {/* Institutional Catalog Breadcrumbs & Course Header Banner */}
      <header className="border-b border-black/[0.04] bg-[#f8f9fa]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-10">
          <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-label-md text-on-surface-variant mb-4">
            <Link to="/courses" className="hover:text-primary transition-colors font-medium">Course Catalog</Link>
            <span aria-hidden="true" className="text-outline">/</span>
            <span className="text-on-surface-variant">School of Computing</span>
            <span aria-hidden="true" className="text-outline">/</span>
            <span className="font-semibold text-primary">Course CS-704</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-black/[0.06] bg-[#eeeef0] px-3 py-1 rounded-xl font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                  Graduate Specification
                </span>
                <span className="border border-primary/20 bg-primary-fixed/20 text-primary px-3 py-1 rounded-xl font-label-md font-bold">
                  Course Code: CS-704
                </span>
                <AIAssistChip label="AI Lab Sandbox Online" size="sm" />
                <span className="border border-black/[0.06] bg-[#eeeef0] px-3 py-1 rounded-xl font-label-md text-on-surface-variant">
                  Version 3.4 • Autumn 2026
                </span>
                <span className="border border-black/[0.06] bg-[#eeeef0] px-3 py-1 rounded-xl font-label-md text-on-surface-variant">
                  Curriculum Board Audited
                </span>
              </div>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-tight">
                Advanced Machine Learning Systems: Foundations to Production Orchestration
              </h1>

              <p className="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                An advanced engineering curriculum examining attention mechanics, distributed multi-node training topologies, low-rank quantization kernels, high-throughput inference serving architectures, and formal evaluative safety verification.
              </p>

              {/* Course Meta Grid - Elevated Floating Tiles */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-sm space-y-1">
                  <div className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Academic Credit</div>
                  <div className="font-headline-sm text-primary font-bold">4.0 ECTS Units</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-sm space-y-1">
                  <div className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Duration</div>
                  <div className="font-headline-sm text-on-surface font-bold">14 Weeks</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-sm space-y-1">
                  <div className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Format</div>
                  <div className="font-headline-sm text-on-surface font-bold">Seminars + Labs</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-sm space-y-1">
                  <div className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Cluster Quota</div>
                  <div className="font-headline-sm text-on-surface font-bold">80 GPU Hours</div>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar - Canonical 3-Button Hierarchy */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 pt-2 lg:pt-0">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleEnrollAction}
                className="w-full justify-center"
              >
                Enroll in Cohort
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setShowPreviewModal(true)}
                className="w-full justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Inspect Sample Seminar
              </Button>

              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleExportSyllabus}
                className="w-full justify-center"
              >
                <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {syllabusExported ? "Syllabus Exported (PDF)" : "Download Syllabus (PDF)"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Two-Column Architectural Layout */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        {/* Enrolled Notification Banner */}
        {enrolledNotice && (
          <div role="status" className="mb-6 p-4 border border-primary bg-primary-fixed/30 rounded-DEFAULT text-on-surface text-body-md flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-primary">Registration Update</p>
                <p className="mt-0.5 text-on-surface-variant">{enrolledNotice}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEnrolledNotice(null)}
              className="text-on-surface-variant hover:text-on-surface font-label-md"
              aria-label="Dismiss notice"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column (8 cols): Primary Academic Dossier */}
          <div className="lg:col-span-8 space-y-10">
            {/* Pedagogical Competency Ledger (No checkmarks, structured table) */}
            <section aria-labelledby="competencies-heading" className="border border-black/[0.04] bg-white p-8 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/[0.04] pb-4">
                <h2 id="competencies-heading" className="font-headline-md text-on-surface font-bold text-xl">
                  Core Pedagogical Competencies
                </h2>
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider bg-primary-fixed/20 px-3 py-1 rounded-xl">
                  ABET Curriculum Standard Section 4.2
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                  <div className="font-mono text-xs text-primary font-bold">COMPETENCY DOMAIN 01</div>
                  <h3 className="font-headline-sm text-on-surface font-bold text-base">Kernel Optimization and Attention Complexity</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Formalize memory bandwidth ceilings, execute tiling schemes, and profile key-value cache access patterns under extreme sequence lengths.
                  </p>
                </div>

                <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                  <div className="font-mono text-xs text-primary font-bold">COMPETENCY DOMAIN 02</div>
                  <h3 className="font-headline-sm text-on-surface font-bold text-base">Distributed Multi-Node Orchestration</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Design and calibrate hybrid parallel partitions combining Megatron-LM tensor slicing, ZeRO-3 parameter sharding, and pipeline bubble minimization.
                  </p>
                </div>

                <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                  <div className="font-mono text-xs text-primary font-bold">COMPETENCY DOMAIN 03</div>
                  <h3 className="font-headline-sm text-on-surface font-bold text-base">Production Serving and Latency Budgets</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Deploy PagedAttention virtual memory systems and speculative decoding architectures meeting strict service level agreements under heavy traffic.
                  </p>
                </div>

                <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                  <div className="font-mono text-xs text-primary font-bold">COMPETENCY DOMAIN 04</div>
                  <h3 className="font-headline-sm text-on-surface font-bold text-base">Empirical Alignment and Safety Audits</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Implement Direct Preference Optimization loss formulations, evaluate reward model calibration, and stress-test automated red-teaming harnesses.
                  </p>
                </div>
              </div>
            </section>

            {/* Navigation Tabs for Deep Information Architecture - Modern Pill Track */}
            <div className="p-1.5 bg-[#eeeef0] rounded-2xl flex gap-1.5 overflow-x-auto">
              <nav aria-label="Course section tabs" className="flex gap-1.5 w-full">
                <button
                  type="button"
                  onClick={() => setActiveTab("syllabus")}
                  className={`py-2.5 px-5 font-semibold text-sm transition-all rounded-xl cursor-pointer ${
                    activeTab === "syllabus"
                      ? "bg-white text-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Syllabus Units & Readings
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("lab-specs")}
                  className={`py-2.5 px-5 font-semibold text-sm transition-all rounded-xl cursor-pointer ${
                    activeTab === "lab-specs"
                      ? "bg-white text-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Compute & Lab Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("faculty")}
                  className={`py-2.5 px-5 font-semibold text-sm transition-all rounded-xl cursor-pointer ${
                    activeTab === "faculty"
                      ? "bg-white text-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Academic Staff & Research
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("prerequisites")}
                  className={`py-2.5 px-5 font-semibold text-sm transition-all rounded-xl cursor-pointer ${
                    activeTab === "prerequisites"
                      ? "bg-white text-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Prerequisites Self-Check
                </button>
              </nav>
            </div>

            {/* TAB 1: SYLLABUS UNITS & READINGS */}
            {activeTab === "syllabus" && (
              <section aria-labelledby="syllabus-units-heading" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 id="syllabus-units-heading" className="font-headline-md text-on-surface font-bold">
                      Curriculum Units ({filteredModules.length} Modules)
                    </h2>
                    <p className="font-body-sm text-on-surface-variant">
                      Total instructional scope: 112 direct hours (52 seminar hours, 60 supervised laboratory hours)
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={expandAllModules}
                      className="text-label-md text-primary hover:underline font-semibold"
                    >
                      Expand All
                    </button>
                    <span aria-hidden="true" className="text-outline">|</span>
                    <button
                      type="button"
                      onClick={collapseAllModules}
                      className="text-label-md text-on-surface-variant hover:text-on-surface"
                    >
                      Collapse All
                    </button>
                  </div>
                </div>

                {/* Filter / Search within Syllabus */}
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search by topic, paper title, or laboratory deliverable..."
                    value={syllabusSearch}
                    onChange={(e) => setSyllabusSearch(e.target.value)}
                    className="w-full h-12 pl-4 pr-16 bg-white border border-black/[0.08] rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all"
                  />
                  {syllabusSearch && (
                    <button
                      type="button"
                      onClick={() => setSyllabusSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-semibold text-on-surface-variant hover:text-on-surface bg-[#eeeef0] rounded-lg"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Syllabus Modules List */}
                <div className="space-y-4">
                  {filteredModules.map((mod) => {
                    const isExpanded = !!expandedModules[mod.id]
                    return (
                      <article
                        key={mod.id}
                        className="border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] overflow-hidden transition-all"
                      >
                        <header className="p-6 bg-white hover:bg-neutral-50/60 transition-colors">
                          <button
                            type="button"
                            onClick={() => toggleModule(mod.id)}
                            className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer"
                            aria-expanded={isExpanded}
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-primary px-3 py-1 border border-primary/20 bg-primary/10 rounded-xl">
                                  UNIT {mod.number}
                                </span>
                                <span className="text-xs font-mono text-on-surface-variant">
                                  {mod.durationHours} Hours • {mod.lectureCount} Lectures + Lab
                                </span>
                              </div>
                              <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                                {mod.title}
                              </h3>
                            </div>
                            <span className="shrink-0 mt-1 text-on-surface font-semibold text-xs px-3.5 py-1.5 border border-black/[0.08] rounded-xl bg-[#eeeef0] group-hover:bg-[#e2e2e5] transition-colors">
                              {isExpanded ? "Close −" : "Details +"}
                            </span>
                          </button>
                        </header>

                        {isExpanded && (
                          <div className="p-6 md:p-8 border-t border-black/[0.04] bg-[#fdfdfe] space-y-6">
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                              {mod.description}
                            </p>

                            {/* Lectures Schedule List */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider mb-2 font-bold text-on-surface">
                                Lecture & Laboratory Sessions
                              </h4>
                              <div className="border border-black/[0.04] rounded-2xl divide-y divide-black/[0.04] bg-[#f8f9fa] overflow-hidden">
                                {mod.lectures.map((lec) => (
                                  <div key={lec.id} className="p-3.5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                      <span className={`text-[11px] font-mono px-2.5 py-1 rounded-lg uppercase tracking-wider font-semibold ${
                                        lec.type === "lab"
                                          ? "bg-secondary-container text-on-secondary-container border border-secondary"
                                          : lec.type === "seminar"
                                          ? "bg-[#eeeef0] text-on-surface-variant border border-black/[0.04]"
                                          : "bg-white text-primary border border-primary/20 shadow-xs"
                                      }`}>
                                        {lec.type}
                                      </span>
                                      <span className="text-sm text-on-surface font-medium">
                                        {lec.title}
                                      </span>
                                    </div>
                                    <span className="font-mono text-xs text-on-surface-variant shrink-0">
                                      {lec.duration}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Academic Papers & Citations */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider mb-2 font-bold text-on-surface">
                                Required Literature & Research Papers
                              </h4>
                              <ul className="space-y-2">
                                {mod.readings.map((reading, idx) => (
                                  <li key={idx} className="p-3.5 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs">
                                    <span className="text-on-surface font-medium">{reading.citation}</span>
                                    <span className="font-mono text-xs text-primary font-bold shrink-0">{reading.source}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Deliverable Box */}
                            <div className="p-4 border border-primary/20 bg-primary/5 rounded-2xl">
                              <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">
                                Unit Deliverable & Assessment Benchmark
                              </div>
                              <p className="text-xs text-on-surface leading-relaxed">
                                {mod.deliverable}
                              </p>
                            </div>
                          </div>
                        )}
                      </article>
                    )
                  })}
                </div>
              </section>
            )}

            {/* TAB 2: COMPUTE & LAB SPECIFICATIONS */}
            {activeTab === "lab-specs" && (
              <section aria-labelledby="lab-specs-heading" className="space-y-6">
                <div className="border border-black/[0.04] bg-white p-8 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-6">
                  <div>
                    <h2 id="lab-specs-heading" className="text-xl font-bold text-on-surface">
                      Supercomputing Laboratory Infrastructure
                    </h2>
                    <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                      All students enrolled in the accredited track receive individual cluster tenancy credentials. Practical laboratory sessions execute on managed high-performance computing partitions with high-speed NVLink interconnects.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                      <div className="font-mono text-xs font-bold text-primary uppercase tracking-wider">HARDWARE ALLOCATION</div>
                      <div className="text-base font-bold text-on-surface">NVIDIA H100 80GB SXM5 Nodes</div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        80 dedicated GPU hours per student, pooled multi-node partitions with InfiniBand 3.2 Tbps fabric for distributed labs.
                      </p>
                    </div>

                    <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                      <div className="font-mono text-xs font-bold text-primary uppercase tracking-wider">SOFTWARE STACK</div>
                      <div className="text-base font-bold text-on-surface">PyTorch 2.5 + CUDA 12.6</div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Pre-configured Docker environments featuring Triton compiler, DeepSpeed ZeRO-3, vLLM 0.6.2, and FlashAttention-3 kernels.
                      </p>
                    </div>

                    <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                      <div className="font-mono text-xs font-bold text-primary uppercase tracking-wider">DATASET REPOSITORY CACHE</div>
                      <div className="text-base font-bold text-on-surface">Local NVMe Scratch Storage</div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        500 GB high-throughput local scratch per user, with cached mirrors of RedPajama-V2, SlimPajama, and LMSYS Chatbot Arena datasets.
                      </p>
                    </div>

                    <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                      <div className="font-mono text-xs font-bold text-primary uppercase tracking-wider">AUTOMATED GRADING HARNESS</div>
                      <div className="text-base font-bold text-on-surface">GitLab CI Performance Benchmarking</div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Submissions are profiled against reference benchmarks for FLOPS utilization, peak VRAM footprint, and numerical convergence.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border border-black/[0.04] bg-[#eeeef0] rounded-2xl">
                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                      Reproducibility & Open Science Policy
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      All lab assignment code repositories are open-sourced under the MIT License. Students retain full intellectual property rights to capstone project implementations and published research manuscripts.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* TAB 3: FACULTY & PAPERS */}
            {activeTab === "faculty" && (
              <section aria-labelledby="faculty-heading" className="space-y-6">
                <div className="border border-black/[0.04] bg-white p-8 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-6">
                  <div>
                    <h2 id="faculty-heading" className="text-xl font-bold text-on-surface">
                      Instructors & Academic Staff
                    </h2>
                    <p className="text-sm text-on-surface-variant mt-1">
                      Supervised by principal investigators from the Distributed Intelligence Laboratory.
                    </p>
                  </div>

                  {/* Primary Instructor */}
                  <div className="flex flex-col sm:flex-row gap-6 p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl items-start">
                    <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center font-mono font-bold text-2xl shrink-0 shadow-sm">
                      AS
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-lg font-bold text-on-surface">Dr. Ananya Sharma, Ph.D.</h3>
                        <span className="text-xs font-mono font-bold text-primary px-2.5 py-0.5 bg-primary/10 rounded-lg">Lead Course Director</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Professor of Computer Systems & Research Chair at the Distributed Intelligence Lab. Former research scientist in machine systems; doctoral degree from IIT Bombay / Stanford. Author of 38 peer-reviewed publications across NeurIPS, ICML, SOSP, and OSDI.
                      </p>
                      <div className="font-mono text-xs text-on-surface-variant bg-white px-3 py-1.5 rounded-lg border border-black/[0.04] inline-block">
                        Office Hours: Tuesdays 16:00 – 18:00 UTC (Virtual Lab Room 4B)
                      </div>
                    </div>
                  </div>

                  {/* Teaching Fellows */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                      <div className="font-mono font-bold text-xs text-primary uppercase">TA • Vikram Malhotra</div>
                      <div className="text-sm font-bold text-on-surface">Systems Lab Lead & GPU Cluster Architect</div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Doctoral candidate researching asynchronous collective algorithms for multi-node training clusters.
                      </p>
                    </div>

                    <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
                      <div className="font-mono font-bold text-xs text-primary uppercase">TA • Dr. Sunita Rao</div>
                      <div className="text-sm font-bold text-on-surface">Alignment Fellow & Benchmark Director</div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Postdoctoral researcher specializing in automated red-teaming and reinforcement learning from human feedback.
                      </p>
                    </div>
                  </div>

                  {/* Selected Bibliography */}
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-bold mb-3 text-on-surface">
                      Selected Faculty Publications (Course Foundations)
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="p-4 border border-black/[0.04] bg-[#f8f9fa] rounded-xl leading-relaxed">
                        <span className="font-bold text-on-surface">Sharma, A. & Malhotra, V. (2024).</span> "Communication-Optimal Tensor Slicing in Asynchronous Clusters." <em>Journal of Machine Learning Research (JMLR)</em>, 25(89): 1-34.
                      </div>
                      <div className="p-4 border border-black/[0.04] bg-[#f8f9fa] rounded-xl leading-relaxed">
                        <span className="font-bold text-on-surface">Sharma, A. et al. (2023).</span> "Memory-Bound Inference Scheduling with Dynamic Context Length Partitioning." <em>Symposium on Operating Systems Principles (SOSP)</em>.
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* TAB 4: PREREQUISITES SELF-CHECK */}
            {activeTab === "prerequisites" && (
              <section aria-labelledby="prereq-heading" className="space-y-6">
                <div className="border border-black/[0.04] bg-white p-8 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-6">
                  <div>
                    <h2 id="prereq-heading" className="text-xl font-bold text-on-surface">
                      Prerequisites Self-Assessment Matrix
                    </h2>
                    <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                      CS-704 is a rigorous graduate-level systems engineering course. Evaluate your background against the core technical competencies below to confirm readiness before registering.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-4 p-5 border border-black/[0.04] rounded-2xl bg-[#f8f9fa] cursor-pointer hover:bg-neutral-50/80 transition-all">
                      <input
                        type="checkbox"
                        checked={quizState.linearAlgebra}
                        onChange={(e) => setQuizState((prev) => ({ ...prev, linearAlgebra: e.target.checked }))}
                        className="mt-1 h-4 w-4 rounded border-outline text-primary focus:ring-primary"
                      />
                      <div>
                        <div className="text-sm font-bold text-on-surface">
                          1. Multivariate Calculus and Linear Algebra
                        </div>
                        <div className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                          Comfortable with singular value decomposition (SVD), Jacobians, Hessians, and matrix calculus for backpropagation derivations.
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-5 border border-black/[0.04] rounded-2xl bg-[#f8f9fa] cursor-pointer hover:bg-neutral-50/80 transition-all">
                      <input
                        type="checkbox"
                        checked={quizState.pythonAsync}
                        onChange={(e) => setQuizState((prev) => ({ ...prev, pythonAsync: e.target.checked }))}
                        className="mt-1 h-4 w-4 rounded border-outline text-primary focus:ring-primary"
                      />
                      <div>
                        <div className="text-sm font-bold text-on-surface">
                          2. Python Systems Programming & PyTorch Internals
                        </div>
                        <div className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                          Proficient with PyTorch autograd graph creation, multiprocessing primitives, memory pinning, and asynchronous coroutines.
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-5 border border-black/[0.04] rounded-2xl bg-[#f8f9fa] cursor-pointer hover:bg-neutral-50/80 transition-all">
                      <input
                        type="checkbox"
                        checked={quizState.deepLearning}
                        onChange={(e) => setQuizState((prev) => ({ ...prev, deepLearning: e.target.checked }))}
                        className="mt-1 h-4 w-4 rounded border-outline text-primary focus:ring-primary"
                      />
                      <div>
                        <div className="text-sm font-bold text-on-surface">
                          3. Deep Learning Foundations
                        </div>
                        <div className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                          Prior completion of an introductory deep learning sequence or equivalent experience training neural networks on real datasets.
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-5 border border-black/[0.04] rounded-2xl bg-[#f8f9fa] cursor-pointer hover:bg-neutral-50/80 transition-all">
                      <input
                        type="checkbox"
                        checked={quizState.cudaBasics}
                        onChange={(e) => setQuizState((prev) => ({ ...prev, cudaBasics: e.target.checked }))}
                        className="mt-1 h-4 w-4 rounded border-outline text-primary focus:ring-primary"
                      />
                      <div>
                        <div className="text-sm font-bold text-on-surface">
                          4. CUDA / Parallel Programming Basics (Optional but Recommended)
                        </div>
                        <div className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                          Basic conceptual knowledge of GPU threads, warps, shared memory banks, and memory latency hiding.
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Readiness Diagnostic Result */}
                  <div className={`p-6 border rounded-2xl ${
                    isPrereqReady
                      ? "border-primary/20 bg-secondary-container/20 text-on-surface"
                      : "border-black/[0.06] bg-[#eeeef0] text-on-surface"
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white border border-black/[0.06]">
                        Diagnosis: {checkedPrereqs} of {totalPrereqs} Confirmed
                      </span>
                    </div>
                    <p className="text-sm font-bold">
                      {isPrereqReady
                        ? "Prepared for Direct Cohort Enrollment"
                        : "Preparatory Foundations Recommended"}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      {isPrereqReady
                        ? "Your self-reported technical preparation satisfies the recommended baseline for CS-704. You will be able to engage with the lab benchmarks effectively."
                        : "We recommend reviewing the preparatory primer course (CS-501: Systems Foundations for AI) prior to undertaking the multi-GPU laboratory exercises."}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Institutional Policies & Governance Section */}
            <section aria-labelledby="governance-heading" className="border border-black/[0.04] bg-white p-8 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-6">
              <h2 id="governance-heading" className="text-xl font-bold text-on-surface">
                Academic Governance & Course Policies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-on-surface-variant">
                <div className="p-5 border border-black/[0.04] rounded-2xl bg-[#f8f9fa]">
                  <div className="font-bold text-on-surface mb-2">Grading Structure</div>
                  <ul className="space-y-1.5 font-mono text-xs">
                    <li>• 5 Laboratory Notebooks: 40%</li>
                    <li>• Mid-Term Systems Exam: 25%</li>
                    <li>• Capstone Project: 25%</li>
                    <li>• Colloquium Participation: 10%</li>
                  </ul>
                </div>

                <div className="p-5 border border-black/[0.04] rounded-2xl bg-[#f8f9fa]">
                  <div className="font-bold text-on-surface mb-2">Honorable Collaboration</div>
                  <p className="leading-relaxed">
                    High-level architectural discussions are encouraged. All submitted code benchmarks, kernel implementations, and proofs must represent individual student work.
                  </p>
                </div>

                <div className="p-5 border border-black/[0.04] rounded-2xl bg-[#f8f9fa]">
                  <div className="font-bold text-on-surface mb-2">Audit Privileges</div>
                  <p className="leading-relaxed">
                    Auditing students receive non-credit access to recorded masterclasses, reading syllabi, and open GitHub repositories for self-directed study.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => setShowTosModal(true)}
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  View Institutional Terms of Enrollment
                </button>
                <span aria-hidden="true" className="text-outline">|</span>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Review Student Privacy & FERPA Compliance
                </button>
              </div>
            </section>
          </div>

          {/* Right Column (4 cols): Sticky Enrollment & Cohort Registry Ledger */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="border border-black/[0.04] bg-white rounded-3xl shadow-[0px_8px_30px_rgba(0,105,79,0.08)] overflow-hidden">
              {/* Enrollment Track Selector Header */}
              <div className="border-b border-black/[0.04] bg-[#f8f9fa] p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-on-surface-variant">
                    Term Registration
                  </span>
                  <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 border border-primary/20 bg-primary/10 rounded-lg">
                    Autumn 2026
                  </span>
                </div>
                <h3 className="text-xl font-bold text-on-surface">
                  Enrollment Registration
                </h3>
              </div>

              <div className="p-6 space-y-5">
                {/* Track Selector Buttons */}
                <fieldset className="space-y-2.5">
                  <legend className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Select Enrollment Path
                  </legend>

                  {/* Option 1: Accredited Cohort */}
                  <label className={`block p-4 border rounded-2xl cursor-pointer transition-all ${
                    selectedTrack === "accredited"
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-black/[0.06] hover:bg-[#f8f9fa]"
                  }`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="enrollment-track"
                        value="accredited"
                        checked={selectedTrack === "accredited"}
                        onChange={() => setSelectedTrack("accredited")}
                        className="mt-1 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm font-bold text-on-surface">
                            Accredited Cohort
                          </span>
                          <span className="font-mono font-bold text-primary text-sm">
                            $380 / Term
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                          4.0 Transcribed ECTS Credits, 80 H100 GPU compute hours, weekly faculty office hours, and accredited examination transcript.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Open Academic Audit */}
                  <label className={`block p-4 border rounded-2xl cursor-pointer transition-all ${
                    selectedTrack === "audit"
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-black/[0.06] hover:bg-[#f8f9fa]"
                  }`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="enrollment-track"
                        value="audit"
                        checked={selectedTrack === "audit"}
                        onChange={() => setSelectedTrack("audit")}
                        className="mt-1 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm font-bold text-on-surface">
                            Open Academic Audit
                          </span>
                          <span className="font-mono font-bold text-on-surface-variant text-sm">
                            $0 (Open Access)
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                          Free access to lecture recordings, reading citations, and open GitHub repositories for self-guided study without formal credit.
                        </p>
                      </div>
                    </div>
                  </label>
                </fieldset>

                {/* Cohort Schedule Details */}
                <div className="p-4 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-on-surface">Instruction Period:</span>
                    <span className="font-mono text-on-surface-variant">Oct 12, 2026 – Jan 29, 2027</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-on-surface">Weekly Seminars:</span>
                    <span className="font-mono text-on-surface-variant">Wednesdays 17:00–19:00 UTC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-on-surface">Cohort Capacity:</span>
                    <span className="font-mono text-primary font-bold">120 Seats (42 Open)</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="space-y-2 pt-1">
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={handleEnrollAction}
                    className="w-full py-3.5 rounded-xl shadow-sm text-sm"
                  >
                    {selectedTrack === "accredited"
                      ? "Register for Accredited Cohort"
                      : "Begin Open Academic Audit"}
                  </Button>

                  <p className="text-center text-[11px] text-on-surface-variant">
                    {selectedTrack === "accredited"
                      ? "Departmental billing or university voucher code eligible at checkout."
                      : "No payment method required for open academic audit."}
                  </p>
                </div>

                {/* Specifications Ledger */}
                <div className="border-t border-black/[0.04] pt-4 space-y-2.5 text-xs">
                  <div className="text-xs uppercase tracking-wider font-bold text-on-surface mb-2">
                    Included with Registration:
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Synchronous Masterclasses</span>
                    <span className="font-mono font-medium text-on-surface">14 Weekly Seminars</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Supervised Lab Sessions</span>
                    <span className="font-mono font-medium text-on-surface">5 Major Assignments</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Faculty Code Reviews</span>
                    <span className="font-mono font-medium text-on-surface">Written Feedback</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Formal Certification</span>
                    <span className="font-mono font-medium text-on-surface">Verifiable Credential</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Inquiries Card */}
            <div className="p-6 border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2 text-xs">
              <div className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Institutional & Departmental Inquiries
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                For university department seat licensing, cross-registration between affiliated institutions, or tuition assistance programs, contact the registrar at:
              </p>
              <div className="font-mono text-xs text-primary font-bold">
                registrar.computing@yukta.edu
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* SAMPLE SEMINAR PREVIEW MODAL */}
      {showPreviewModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="border border-black/[0.04] bg-white max-w-3xl w-full rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-black/[0.04] pb-4">
              <div>
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  SAMPLE SEMINAR 1.3 PREVIEW
                </span>
                <h3 id="preview-modal-title" className="text-lg font-bold text-on-surface mt-1">
                  Memory Complexity: HBM Bandwidth Bounds and IO-Aware Attention
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="text-on-surface-variant hover:text-on-surface text-xs font-semibold px-3 py-1.5 border border-black/[0.08] rounded-xl bg-[#eeeef0] transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Mock Player Surface */}
            <div className="border border-black/[0.04] bg-[#f8f9fa] rounded-2xl p-6 space-y-4">
              <div className="aspect-video bg-[#1a1c1e] flex flex-col items-center justify-center rounded-2xl text-white p-6 text-center">
                <div className="w-14 h-14 rounded-full border border-white/20 bg-white/10 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="font-mono text-sm font-semibold">
                  Instructional Clip: FlashAttention Roofline Model Analysis
                </div>
                <div className="font-mono text-xs text-neutral-400 mt-1">
                  Duration: 14m 20s • Dr. Ananya Sharma
                </div>
              </div>

              {/* Seminar Timestamp Markers */}
              <div>
                <div className="text-xs uppercase tracking-wider mb-2 font-bold text-on-surface">
                  Lecture Chapters & Key Topics
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="p-3 border border-black/[0.04] rounded-xl bg-white flex justify-between items-center">
                    <span className="text-on-surface">00:00 – Review of Quadratic Attention Memory Overhead</span>
                    <span className="text-primary font-bold">4m 12s</span>
                  </div>
                  <div className="p-3 border border-black/[0.04] rounded-xl bg-white flex justify-between items-center">
                    <span className="text-on-surface">04:12 – High Bandwidth Memory (HBM) vs SRAM Hierarchy</span>
                    <span className="text-primary font-bold">5m 30s</span>
                  </div>
                  <div className="p-3 border border-black/[0.04] rounded-xl bg-white flex justify-between items-center">
                    <span className="text-on-surface">09:42 – Mathematical Derivation of Safe Softmax Tiling</span>
                    <span className="text-primary font-bold">4m 38s</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-black/[0.04]">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowPreviewModal(false)}
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* INSTITUTIONAL TERMS OF ENROLLMENT MODAL */}
      {showTosModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tos-modal-title"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="border border-black/[0.04] bg-white max-w-2xl w-full rounded-3xl p-8 space-y-6 my-8 shadow-2xl">
            <div className="flex items-start justify-between border-b border-black/[0.04] pb-4">
              <div>
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  INSTITUTIONAL GOVERNANCE
                </span>
                <h3 id="tos-modal-title" className="text-lg font-bold text-on-surface mt-1">
                  Academic Terms of Enrollment (Yukta EduOS)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTosModal(false)}
                className="text-on-surface-variant hover:text-on-surface text-xs font-semibold px-3 py-1.5 border border-black/[0.08] rounded-xl bg-[#eeeef0] transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-on-surface-variant leading-relaxed max-h-96 overflow-y-auto pr-2">
              <h4 className="font-bold text-on-surface text-sm">1. Academic Credit Recognition</h4>
              <p>
                Enrollment in the Accredited Cohort confers 4.0 European Credit Transfer System (ECTS) units upon satisfactory completion of all laboratory benchmarks and the capstone defense. Transcripts are cryptographically signed and issued by the School of Computing.
              </p>

              <h4 className="font-bold text-on-surface text-sm">2. Cluster Compute Resource Quotas</h4>
              <p>
                Each accredited student is allocated 80 GPU hours on NVIDIA H100 partitions. Quotas are non-transferable and subject to fair-use scheduling. Compute access terminates at the conclusion of the 14-week term.
              </p>

              <h4 className="font-bold text-on-surface text-sm">3. Academic Integrity and Originality</h4>
              <p>
                All submitted assignments undergo automated source verification. While leveraging open-source utilities and standard libraries is integral to modern systems engineering, unattributed submission of peer work or unacknowledged generative syntheses constitutes grounds for immediate academic review.
              </p>

              <h4 className="font-bold text-on-surface text-sm">4. Withdrawal and Tuition Adjustments</h4>
              <p>
                Students may withdraw with a full refund of laboratory fees prior to 23:59 UTC on October 19, 2026 (end of the second instruction week). After this deadline, lab infrastructure commitments are locked for the term.
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-black/[0.04]">
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowTosModal(false)}
              >
                I Understand and Acknowledge
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT PRIVACY & FERPA POLICY MODAL */}
      {showPrivacyModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="border border-black/[0.04] bg-white max-w-2xl w-full rounded-3xl p-8 space-y-6 my-8 shadow-2xl">
            <div className="flex items-start justify-between border-b border-black/[0.04] pb-4">
              <div>
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  DATA PROTECTION & COMPLIANCE
                </span>
                <h3 id="privacy-modal-title" className="text-lg font-bold text-on-surface mt-1">
                  Student Data Privacy & Telemetry Disclosure
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="text-on-surface-variant hover:text-on-surface text-xs font-semibold px-3 py-1.5 border border-black/[0.08] rounded-xl bg-[#eeeef0] transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-on-surface-variant leading-relaxed max-h-96 overflow-y-auto pr-2">
              <h4 className="font-bold text-on-surface text-sm">1. Student Records Protection (FERPA & GDPR)</h4>
              <p>
                Educational records, assignment grades, and colloquium participation logs are strictly confidential. Data is stored on secure European Union and North American academic cloud regions complying with FERPA 34 CFR Part 99 and GDPR Regulation (EU) 2016/679.
              </p>

              <h4 className="font-bold text-on-surface text-sm">2. Laboratory Cluster Telemetry</h4>
              <p>
                Laboratory servers collect runtime hardware statistics (GPU utilization, memory bandwidth, compilation times) solely for debugging student code and enforcing fair-use cluster scheduling. No proprietary code or private student weights are shared with third parties or used for external model training.
              </p>

              <h4 className="font-bold text-on-surface text-sm">3. Data Retention and Erasure</h4>
              <p>
                Student accounts retain access to completed laboratory repositories indefinitely. Scratch disk allocations on cluster nodes are securely overwritten 30 days after term completion.
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-black/[0.04]">
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowPrivacyModal(false)}
              >
                Acknowledge Privacy Terms
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Legal Footer */}
      <footer className="w-full mt-24 border-t border-black/[0.04] bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-base font-bold text-primary">Yukta EduOS</div>
            <p className="text-xs text-on-surface-variant">
              Department of Computing & Advanced Engineering • Academic Operating System
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium">
            <button
              type="button"
              onClick={() => setShowTosModal(true)}
              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Institutional Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Student Privacy Policy
            </button>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors">
              Department Registrar
            </Link>
            <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors">
              Academic Accreditation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
