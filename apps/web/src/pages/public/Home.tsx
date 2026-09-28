import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { AIAssistChip } from "../../components/ui/AIAssistChip"
import { CourseCard } from "../../components/ui/CourseCard"
import { Button } from "../../components/ui/Button"
import { GlassCard } from "../../components/ui/Card"
import { Search, Sparkles, Cpu, BookOpen, Users, ArrowRight, Award } from "lucide-react"



export const Home: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [showTosModal, setShowTosModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [searchVal, setSearchVal] = useState("")

  const academicDepartments = [
    {
      code: "DEPT-CS",
      name: "Distributed Systems & Cloud Infrastructure",
      courses: "14 Advanced Courses",
      faculty: "Prof. Sharma, Dr. Malhotra",
      spec: "NVLink Clusters • InfiniBand 3.2Tbps • ZeRO Partitions",
      link: "/courses"
    },
    {
      code: "DEPT-AI",
      name: "Machine Learning & Numerical Computing",
      courses: "18 Advanced Courses",
      faculty: "Dr. Rao, Prof. Subramanian",
      spec: "PyTorch 2.5 • Triton JIT • Attention Kernel Optimization",
      link: "/courses"
    },
    {
      code: "DEPT-SEC",
      name: "Formal Verification & Model Safety",
      courses: "9 Advanced Courses",
      faculty: "Prof. Venkataraman, Dr. Nair",
      spec: "Constitutional Alignment • DPO Losses • Empirical Red-Teaming",
      link: "/courses"
    },
    {
      code: "DEPT-MTH",
      name: "Applied Mathematics & Mathematical Physics",
      courses: "12 Advanced Courses",
      faculty: "Prof. Subramanian, Dr. Kulkarni",
      spec: "Differential Geometry • Convex Optimization • Stochastic PDEs",
      link: "/courses"
    }
  ]

  const featuredCourses = [
    {
      id: "cs-704",
      code: "CS-704",
      title: "Advanced Machine Learning Systems: Foundations to Production",
      instructor: "Dr. Ananya Sharma",
      department: "School of Computing",
      term: "Autumn 2026",
      credits: "4.0 ECTS",
      duration: "14 Weeks",
      level: "Graduate Seminar",
      spec: "80 H100 GPU Hours",
      thumbnailUrl: "/images/neural_compute_lab.jpg",
      progressPercent: 68,
      progressLabel: "Week 6 of 14"
    },
    {
      id: "cs-602",
      code: "CS-602",
      title: "Distributed Operating Systems & Collective Topologies",
      instructor: "Vikram Malhotra",
      department: "Systems Division",
      term: "Autumn 2026",
      credits: "3.5 ECTS",
      duration: "12 Weeks",
      level: "Upper Undergraduate",
      spec: "Multi-Node Clusters",
      thumbnailUrl: "/images/distributed_systems_lab.jpg",
      progressPercent: 42,
      progressLabel: "Week 4 of 12"
    },
    {
      id: "ai-715",
      code: "AI-715",
      title: "High-Throughput Inference Architecture & Memory Budgets",
      instructor: "Dr. Sunita Rao",
      department: "Intelligence Lab",
      term: "Autumn 2026",
      credits: "4.0 ECTS",
      duration: "14 Weeks",
      level: "Graduate Seminar",
      spec: "vLLM / TensorRT",
      thumbnailUrl: "/images/quantum_cryptography_lab.jpg",
      progressPercent: 55,
      progressLabel: "Week 5 of 14"
    }
  ]

  const faqItems = [
    {
      q: "What distinguishes Yukta EduOS from commercial course platforms?",
      a: "Yukta EduOS is an institutional academic operating system designed for higher education and engineering research. Rather than passive video playlists, courses provide managed GPU compute cluster quotas, peer-reviewed syllabi with primary paper citations, supervised laboratory sessions, and accredited university ECTS credits."
    },
    {
      q: "How does the Open Academic Audit track work?",
      a: "Under our commitment to open science, all recorded masterclasses, reading lists, and public code repositories are accessible at zero tuition cost. Students seeking university transcripts, dedicated cluster compute time, and faculty code reviews may register for the Accredited Degree Cohort."
    },
    {
      q: "Are course credits recognized internationally?",
      a: "Yes. All accredited courses are mapped to the European Credit Transfer and Accumulation System (ECTS) and align with ABET curriculum specifications for graduate and advanced engineering programs."
    },
    {
      q: "What supercomputing infrastructure is provided for laboratory assignments?",
      a: "Students in accredited cohorts receive individual cluster credentials providing up to 80 GPU hours on NVIDIA H100 SXM5 partitions, complete with high-speed local NVMe scratch storage and automated continuous integration performance testing."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Header />

      {/* Hero: Institutional Academic Command Banner */}
      <section className="border-b border-black/[0.04] bg-[#f4f5f8]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-primary/20 bg-primary-fixed/20 text-primary px-3 py-1 rounded-xl font-label-md font-bold uppercase tracking-wider">
                Institutional Operating System
              </span>
              <span className="border border-black/[0.06] bg-[#eeeef0] px-3 py-1 rounded-xl font-label-md text-on-surface-variant font-medium">
                Higher Education & Engineering Research
              </span>
              <AIAssistChip label="Yukta AI Copilot Enabled" />
            </div>

            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-tight">
              Rigorous engineering education powered by distributed laboratory compute.
            </h1>

            <p className="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
              Yukta EduOS unifies accredited curriculum syllabi, dedicated supercomputing cluster environments, and peer-reviewed faculty instruction into an open, accountable academic workspace.
            </p>

            {/* Pill Search Bar Specimen matching Design Board */}
            <div className="relative max-w-xl pt-2">
              <Search className="w-5 h-5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search curricula, GPU cluster nodes, faculty publications..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white rounded-2xl border border-black/[0.08] text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all"
              />
            </div>

            {/* Hero Action Buttons - Showcasing Design Board Button System */}
            <div className="pt-2 flex flex-wrap gap-3 items-center">
              <Link to="/courses">
                <Button variant="primary" size="md">
                  Explore Curricula
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="md">
                  Institutional Charter
                </Button>
              </Link>
            </div>
          </div>

          {/* Academic Governance Strip - Level 1 White Floating Cards */}
          <div className="mt-12 pt-6 border-t border-black/[0.04] grid grid-cols-2 md:grid-cols-4 gap-4 text-body-sm">
            <div className="p-6 rounded-3xl bg-white border border-black/[0.04] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] space-y-1.5">
              <div className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Accreditation</div>
              <div className="text-headline-sm font-bold text-on-surface mt-1">ABET & ECTS Mapped</div>
              <div className="text-on-surface-variant text-xs mt-0.5">Formal university transfer units</div>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-black/[0.04] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] space-y-1.5">
              <div className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Laboratory Fabric</div>
              <div className="text-headline-sm font-bold text-on-surface mt-1">NVIDIA H100 Tenancy</div>
              <div className="text-on-surface-variant text-xs mt-0.5">80 GPU hours per cohort seat</div>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-black/[0.04] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] space-y-1.5">
              <div className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Faculty Pedigree</div>
              <div className="text-headline-sm font-bold text-on-surface mt-1">100% Peer-Reviewed</div>
              <div className="text-on-surface-variant text-xs mt-0.5">Active lab researchers & chairs</div>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-black/[0.04] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] space-y-1.5">
              <div className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Open Science</div>
              <div className="text-headline-sm font-bold text-on-surface mt-1">Free Academic Audit</div>
              <div className="text-on-surface-variant text-xs mt-0.5">Open reading syllabi and repos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-16">
        
        {/* Section 0: Core Academic Infrastructure (Dedicated Laboratory Compute & Verified Pedagogy) */}
        <section aria-labelledby="infrastructure-heading" className="space-y-6">
          <div className="border-b border-black/[0.04] pb-4">
            <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Institutional Capabilities</span>
            <h2 id="infrastructure-heading" className="text-2xl md:text-3xl font-bold text-on-surface mt-1">
              Core Academic Infrastructure &amp; Research Fabric
            </h2>
            <p className="text-sm text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              Yukta EduOS unifies supercomputing laboratory tenancies, international curricular accreditation, and direct faculty mentorship into an authentic engineering ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Compute Fabric Card */}
            <div className="p-8 bg-white border border-black/[0.04] rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_36px_rgba(0,105,79,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-xl uppercase tracking-wider">
                    Supercomputing Fabric
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#eeeef0] flex items-center justify-center text-primary">
                    <Cpu className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface">
                    Dedicated GPU Tenancies
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                    Every cohort scholar receives dedicated NVIDIA H100 SXM5 node slices with 80 GPU hours, interactive Triton/PyTorch kernel profiling, and multi-node InfiniBand fabrics.
                  </p>
                </div>
                <div className="space-y-2 pt-3 text-xs font-mono text-on-surface-variant border-t border-black/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> 80 H100 GPU Lab Hours Allocated
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Real-Time Roofline &amp; TFLOPS Telemetry
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Browser Interactive Cluster Shells
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Link to="/courses" className="w-full block">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Explore Computing Curricula <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Accreditation Card */}
            <div className="p-8 bg-white border border-black/[0.04] rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_36px_rgba(0,105,79,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-secondary px-3 py-1 bg-secondary/10 rounded-xl uppercase tracking-wider">
                    Accredited Curricula
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#eeeef0] flex items-center justify-center text-secondary">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface">
                    European &amp; ABET ECTS Units
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                    Formal university transferable credit units backed by immutable cryptographic verification, institutional registrar key signatures, and rigorous syllabi citing peer-reviewed arXiv &amp; IEEE papers.
                  </p>
                </div>
                <div className="space-y-2 pt-3 text-xs font-mono text-on-surface-variant border-t border-black/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className="text-secondary font-bold">✓</span> 4.0 ECTS Units per Completed Cohort
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary font-bold">✓</span> Tamper-Proof Cryptographic Transcripts
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary font-bold">✓</span> Instant Public Verification Registry
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Link to="/verify-certificate" className="w-full block">
                  <Button variant="secondary" size="md" className="w-full justify-center">
                    Verify Academic Credentials <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Faculty Mentorship Card */}
            <div className="p-8 bg-white border border-black/[0.04] rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_36px_rgba(0,105,79,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1a1c1e] px-3 py-1 bg-[#eeeef0] rounded-xl uppercase tracking-wider">
                    Peer-Reviewed Faculty
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#eeeef0] flex items-center justify-center text-charcoal">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface">
                    Colloquium &amp; Lab Mentorship
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                    Direct instruction led by active laboratory directors and senior research fellows. Includes weekly synchronous colloquium seminars, automated CI test evaluation, and 1-on-1 office hours.
                  </p>
                </div>
                <div className="space-y-2 pt-3 text-xs font-mono text-on-surface-variant border-t border-black/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Synchronous Research Colloquiums
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Direct 1-on-1 Faculty Office Hours
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Automated CI Test Harness Grading
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Link to="/mentors" className="w-full block">
                  <Button variant="outline" size="md" className="w-full justify-center">
                    Inspect Faculty Directory <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Section 1: Featured Graduate Courses Ledger (Official Course Cards) */}
        <section aria-labelledby="curricula-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-outline-variant pb-4">
            <div>
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Autumn 2026 Term</span>
              <h2 id="curricula-heading" className="text-headline-md font-bold text-on-surface mt-1">
                Featured Laboratory Curricula
              </h2>
            </div>
            <Link to="/courses" className="font-label-md text-primary font-semibold hover:underline">
              View All 53 Courses Across Departments →
            </Link>
          </div>

          {/* 3-Column Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((c) => (
              <CourseCard
                key={c.id}
                id={c.id}
                code={c.code}
                title={c.title}
                department={c.department}
                level={c.level}
                term={c.term}
                credits={c.credits}
                duration={c.duration}
                instructor={c.instructor}
                spec={c.spec}
                thumbnailUrl={c.thumbnailUrl}
                progressPercent={c.progressPercent}
                progressLabel={c.progressLabel}
              />
            ))}
          </div>
        </section>

        {/* Section 2: AI-First Intelligence Layer (Glassmorphism & AI Surfaces) */}
        <section aria-labelledby="ai-features-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-outline-variant pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  AI-First Educational Environment
                </span>
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <h2 id="ai-features-heading" className="text-headline-md font-bold text-on-surface mt-1">
                Intelligent Compute Telemetry & Syllabus Synthesis
              </h2>
            </div>
            <span className="font-mono text-xs text-on-surface-variant">
              12px Blur • 70% Opacity • FERPA Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Surface 1 */}
            <GlassCard ai className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AIAssistChip label="Autonomous PyTorch Profiler" />
                  <span className="text-xs text-on-surface-variant font-mono">v4.2</span>
                </div>
                <span className="text-xs text-primary font-mono font-bold">Live H100 Kernel Trace</span>
              </div>

              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary shrink-0" />
                Real-Time GPU Kernel Optimization & Memory Roofline
              </h3>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                Yukta AI continuously monitors student cluster sessions, providing compiler diagnostics, attention head arithmetic intensity, and memory bottleneck alerts before laboratory submission.
              </p>

              <div className="p-3 bg-primary-fixed/20 border border-primary/20 rounded-DEFAULT text-xs font-mono text-on-primary-fixed space-y-1">
                <div>✓ FlashAttention-3 Kernel Speedup: 2.4x vs Baseline</div>
                <div>✓ FP8 Matrix Multiplications: 91.4% Tensor Core Utilization</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link to="/courses/cs-704">
                  <Button variant="primary" size="sm">
                    Inspect Laboratory Specs
                  </Button>
                </Link>
                <Link to="/student/dashboard">
                  <Button variant="secondary" size="sm">
                    View Student Console
                  </Button>
                </Link>
              </div>
            </GlassCard>

            {/* AI Surface 2 */}
            <GlassCard ai className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AIAssistChip label="Research Literature Synthesizer" />
                  <span className="text-xs text-on-surface-variant font-mono">Curriculum Board Verified</span>
                </div>
                <span className="text-xs text-primary font-mono font-bold">Primary Literature</span>
              </div>

              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary shrink-0" />
                Automated Reading Lists & Prerequisite Mapping
              </h3>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                Connects graduate lecture topics directly with landmark ICLR, NeurIPS, and OSDI peer-reviewed papers. Diagnoses prerequisite preparation and generates personalized study roadmaps.
              </p>

              <div className="p-3 bg-surface-container-low border border-outline-variant/60 rounded-DEFAULT text-xs font-mono text-on-surface-variant space-y-1">
                <div>• Citation: Attention Is All You Need (Vaswani et al., 2017)</div>
                <div>• Verified Milestone: Transformer from Scratch Benchmark (Due in 4 days)</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link to="/courses">
                  <Button variant="primary" size="sm">
                    Browse All Reading Syllabi
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Section 3: Academic Departments */}
        <section aria-labelledby="departments-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-outline-variant pb-4">
            <div>
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Academic Divisions</span>
              <h2 id="departments-heading" className="text-headline-md font-bold text-on-surface mt-1">
                Engineering Schools & Research Laboratories
              </h2>
            </div>
            <Link to="/courses" className="font-label-md text-primary font-semibold hover:underline">
              View Department Syllabi →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicDepartments.map((dept) => (
              <div
                key={dept.code}
                className="p-8 border border-black/[0.04] bg-white rounded-3xl space-y-4 shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_36px_rgba(0,105,79,0.08)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary px-3 py-1 border border-primary/20 bg-primary-fixed/20 rounded-xl">
                    {dept.code}
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">{dept.courses}</span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-bold text-on-surface text-lg">
                    {dept.name}
                  </h3>
                  <div className="text-body-sm text-on-surface-variant text-xs mt-1">
                    Chairs: {dept.faculty}
                  </div>
                </div>
                <div className="p-3.5 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl font-mono text-xs text-on-surface-variant">
                  {dept.spec}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Four Pedagogical & Systems Pillars */}
        <section aria-labelledby="pillars-heading" className="border border-black/[0.04] bg-white p-8 md:p-12 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-8">
          <div className="border-b border-black/[0.04] pb-4">
            <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Educational Architecture</span>
            <h2 id="pillars-heading" className="text-headline-md font-bold text-on-surface mt-1">
              Engineering Principles of Yukta EduOS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
              <div className="font-mono text-xs text-primary font-bold">PILLAR 01</div>
              <h3 className="text-headline-sm font-bold text-on-surface text-base">Direct Hardware Tenancy</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Rather than simulated coding sandboxes, students compile and profile kernels on dedicated multi-node GPU clusters with direct NVLink telemetry and bare-metal performance monitoring.
              </p>
            </div>

            <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
              <div className="font-mono text-xs text-primary font-bold">PILLAR 02</div>
              <h3 className="text-headline-sm font-bold text-on-surface text-base">Primary Literature Rigor</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Course modules ground engineering theory in landmark peer-reviewed publications from NeurIPS, ICML, SOSP, and OSDI, examining both mathematical foundations and production failure cases.
              </p>
            </div>

            <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
              <div className="font-mono text-xs text-primary font-bold">PILLAR 03</div>
              <h3 className="text-headline-sm font-bold text-on-surface text-base">Automated Continuous Integration Benchmarking</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Laboratory deliverables are automatically compiled and verified through automated GitLab CI test harnesses measuring FLOPS utilization, peak memory footprint, and numerical convergence.
              </p>
            </div>

            <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
              <div className="font-mono text-xs text-primary font-bold">PILLAR 04</div>
              <h3 className="text-headline-sm font-bold text-on-surface text-base">Cryptographic Credential Transparency</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Every transcript, course completion certificate, and ECTS credit audit is cryptographically stamped on the university public registry for verifiable transfer to partner institutions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Frequently Addressed Academic Questions */}
        <section aria-labelledby="faq-heading" className="space-y-6">
          <div className="border-b border-black/[0.04] pb-4">
            <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Institutional Policies</span>
            <h2 id="faq-heading" className="text-headline-md font-bold text-on-surface mt-1">
              Curriculum & Enrollment Inquiries
            </h2>
          </div>

          <div className="border border-black/[0.04] bg-white rounded-3xl divide-y divide-black/[0.04] overflow-hidden shadow-[0px_4px_24px_rgba(0,0,0,0.04)]">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div key={idx} className="p-6">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors pr-4">
                      {item.q}
                    </span>
                    <span className="font-mono text-sm px-3 py-1 border border-black/[0.06] rounded-xl bg-[#eeeef0] text-on-surface-variant shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="font-body-sm text-on-surface-variant mt-4 leading-relaxed max-w-3xl">
                      {item.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </main>

      {/* Institutional Terms Modal */}
      {showTosModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-on-surface/40 flex items-center justify-center p-4">
          <div className="border border-outline-variant bg-surface-container-lowest max-w-2xl w-full rounded-DEFAULT p-6 space-y-4 shadow-[0px_10px_30px_rgba(0,105,79,0.12)]">
            <div className="flex items-start justify-between border-b border-outline-variant pb-3">
              <h3 className="text-headline-sm font-bold text-on-surface">Institutional Terms of Enrollment</h3>
              <button type="button" onClick={() => setShowTosModal(false)} className="font-mono text-sm px-2 py-1 border border-outline-variant rounded-sm hover:bg-surface-container">Close ✕</button>
            </div>
            <div className="text-body-sm text-on-surface-variant space-y-3 max-h-80 overflow-y-auto">
              <p>Enrollment confers academic rights subject to the Yukta EduOS Academic Honor Code. Cluster compute time is allocated on a semester basis and governed by fair-use scheduling policies.</p>
              <p>Transcripts are issued under ECTS standards and verifiable through our public registry.</p>
            </div>
            <div className="flex justify-end pt-2 border-t border-outline-variant">
              <Button variant="primary" size="sm" onClick={() => setShowTosModal(false)}>
                Acknowledge
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Privacy Modal */}
      {showPrivacyModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-on-surface/40 flex items-center justify-center p-4">
          <div className="border border-outline-variant bg-surface-container-lowest max-w-2xl w-full rounded-DEFAULT p-6 space-y-4 shadow-[0px_10px_30px_rgba(0,105,79,0.12)]">
            <div className="flex items-start justify-between border-b border-outline-variant pb-3">
              <h3 className="text-headline-sm font-bold text-on-surface">Student Data Privacy & FERPA Compliance</h3>
              <button type="button" onClick={() => setShowPrivacyModal(false)} className="font-mono text-sm px-2 py-1 border border-outline-variant rounded-sm hover:bg-surface-container">Close ✕</button>
            </div>
            <div className="text-body-sm text-on-surface-variant space-y-3 max-h-80 overflow-y-auto">
              <p>Student records are confidential and maintained in compliance with FERPA 34 CFR Part 99 and EU GDPR. Compute telemetry is collected solely for grading diagnostics and resource allocation.</p>
            </div>
            <div className="flex justify-end pt-2 border-t border-outline-variant">
              <Button variant="primary" size="sm" onClick={() => setShowPrivacyModal(false)}>
                Acknowledge
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Footer */}
      <footer className="w-full mt-20 border-t border-outline-variant bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-headline-sm font-bold text-primary">Yukta EduOS</div>
            <p className="font-body-sm text-on-surface-variant text-xs">
              Academic Operating System for Higher Education & Engineering Research
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-body-sm">
            <button type="button" onClick={() => setShowTosModal(true)} className="text-on-surface-variant hover:text-primary transition-colors">
              Terms of Enrollment
            </button>
            <button type="button" onClick={() => setShowPrivacyModal(true)} className="text-on-surface-variant hover:text-primary transition-colors">
              Student Privacy & FERPA
            </button>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors">
              Registrar Directory
            </Link>
            <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors">
              Accreditation Charter
            </Link>
            <Link to="/design-system" className="text-on-surface-variant hover:text-primary transition-colors">
              Design System
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
