import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { GlassCard } from "../../components/ui/Card"
import { Badge } from "../../components/ui/Badge"
import { AIAssistChip } from "../../components/ui/AIAssistChip"
import { 
  Search, 
  CheckCircle2
} from "lucide-react"

type TabType = "overview" | "tokens" | "components" | "ai"

const TABS: { id: TabType; label: string }[] = [
  { id: "overview", label: "Visual System Board" },
  { id: "tokens", label: "Palette & Scales" },
  { id: "components", label: "Core Components" },
  { id: "ai", label: "AI Glassmorphic Surfaces" },
]

export const DesignSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [inputVal, setInputVal] = useState("")

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-on-surface flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
      <Header />

      {/* Header Banner */}
      <section className="border-b border-black/[0.04] bg-white py-12 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                DESIGN SYSTEM SPECIFICATION
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Yukta EduOS v1.0 • Modern Corporate & Academic
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight">
              Design Architecture & Token Ledger
            </h1>
            <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
              An institutional, AI-first educational design language defined by restrained geometry, Emerald Deep palette, Outfit typography, and tonal elevation layers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AIAssistChip label="AI System Enabled" />
            <Link to="/courses">
              <Button variant="primary" size="md">
                View Applied Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="border-b border-black/[0.04] bg-white sticky top-14 z-30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex gap-8 text-sm font-semibold">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 flex-1 space-y-12">
        {/* TAB 1: VISUAL SYSTEM BOARD */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">Design System Board</h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Live interactive rendering corresponding to the official Yukta EduOS visual design specification.
              </p>
            </div>

            {/* Board Container */}
            <div className="p-6 md:p-8 rounded-3xl bg-neutral-100/70 border border-black/[0.04] grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Color Swatches */}
              <div className="lg:col-span-3 space-y-4">
                {/* Primary Swatch */}
                <div className="p-5 rounded-2xl bg-[#00694F] text-white space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex justify-between items-center text-xs font-bold font-mono">
                    <span>Primary</span>
                    <span>#00694F</span>
                  </div>
                  <div className="grid grid-cols-8 h-7 rounded-lg overflow-hidden">
                    <div className="bg-[#002116]" />
                    <div className="bg-[#003828]" />
                    <div className="bg-[#004f3a]" />
                    <div className="bg-[#00694f]" />
                    <div className="bg-[#5ddcb0]" />
                    <div className="bg-[#7cf9cb]" />
                    <div className="bg-[#9ff3d2]" />
                    <div className="bg-[#ffffff]" />
                  </div>
                </div>

                {/* Secondary Swatch */}
                <div className="p-5 rounded-2xl bg-[#00A37B] text-white space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex justify-between items-center text-xs font-bold font-mono">
                    <span>Secondary</span>
                    <span>#00A37B</span>
                  </div>
                  <div className="grid grid-cols-8 h-7 rounded-lg overflow-hidden">
                    <div className="bg-[#00281d]" />
                    <div className="bg-[#00513c]" />
                    <div className="bg-[#006c50]" />
                    <div className="bg-[#00A37B]" />
                    <div className="bg-[#5ddcb0]" />
                    <div className="bg-[#7cf9cb]" />
                    <div className="bg-[#cbf7e6]" />
                    <div className="bg-[#ffffff]" />
                  </div>
                </div>

                {/* Tertiary Swatch */}
                <div className="p-5 rounded-2xl bg-[#F0FDF4] text-charcoal border border-black/[0.06] space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex justify-between items-center text-xs font-bold font-mono text-[#004f3a]">
                    <span>Tertiary</span>
                    <span>#F0FDF4</span>
                  </div>
                  <div className="grid grid-cols-8 h-7 rounded-lg overflow-hidden">
                    <div className="bg-[#131e19]" />
                    <div className="bg-[#3c4741]" />
                    <div className="bg-[#535f58]" />
                    <div className="bg-[#6f7a74]" />
                    <div className="bg-[#bec9c2]" />
                    <div className="bg-[#d9e6dd]" />
                    <div className="bg-[#F0FDF4]" />
                    <div className="bg-[#ffffff]" />
                  </div>
                </div>

                {/* Neutral Swatch */}
                <div className="p-5 rounded-2xl bg-[#1A1C1E] text-white space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex justify-between items-center text-xs font-bold font-mono">
                    <span>Neutral</span>
                    <span>#1A1C1E</span>
                  </div>
                  <div className="grid grid-cols-8 h-7 rounded-lg overflow-hidden">
                    <div className="bg-[#000000]" />
                    <div className="bg-[#1A1C1E]" />
                    <div className="bg-[#2f3133]" />
                    <div className="bg-[#3f4944]" />
                    <div className="bg-[#6f7a74]" />
                    <div className="bg-[#bec9c2]" />
                    <div className="bg-[#eeeef0]" />
                    <div className="bg-[#ffffff]" />
                  </div>
                </div>
              </div>

              {/* Center Column: Typography Specimens */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 rounded-2xl bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex justify-between items-center text-xs text-on-surface-variant font-label-md uppercase mb-2">
                    <span>Headline</span>
                    <span className="font-mono font-bold text-primary">Outfit 700</span>
                  </div>
                  <div className="text-6xl font-bold text-on-surface">
                    Aa
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex justify-between items-center text-xs text-on-surface-variant font-label-md uppercase mb-2">
                    <span>Body</span>
                    <span className="font-mono font-bold text-primary">Outfit 400</span>
                  </div>
                  <div className="text-5xl font-normal text-on-surface">
                    Aa
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex justify-between items-center text-xs text-on-surface-variant font-label-md uppercase mb-2">
                    <span>Label</span>
                    <span className="font-mono font-bold text-primary">Outfit 600</span>
                  </div>
                  <div className="text-4xl font-semibold text-on-surface">
                    Aa
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive UI Components */}
              <div className="lg:col-span-5 space-y-4">
                {/* Button Quadrant */}
                <div className="p-6 rounded-2xl bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-3">
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Button Variants
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="primary" size="md">
                      Primary
                    </Button>
                    <Button variant="secondary" size="md">
                      Secondary
                    </Button>
                    <Button variant="inverted" size="md">
                      Inverted
                    </Button>
                    <Button variant="outline" size="md">
                      Outlined
                    </Button>
                  </div>
                </div>

                {/* Search Bar Specimen */}
                <div className="p-6 rounded-2xl bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-3">
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Search Bar Component
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search curricula, hardware nodes, or faculty..."
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      className="w-full h-11 pl-11 pr-4 bg-white rounded-xl border border-black/[0.08] text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
                    />
                  </div>
                </div>

                {/* Progress Bar & Academic Status Specimen */}
                <div className="p-6 rounded-2xl bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-on-surface-variant font-mono">
                      <span>Curriculum Mastery Progress</span>
                      <span className="font-bold text-primary">68%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#eeeef0] overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "68%" }} />
                    </div>
                    <div className="w-3/4 h-2 rounded-full bg-primary/70" />
                    <div className="w-1/2 h-2 rounded-full bg-on-surface/80" />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.04]">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Verified System Primitives</span>
                    </div>
                    <AIAssistChip label="Live Specs" size="sm" />
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PALETTE & TOKENS */}
        {activeTab === "tokens" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-headline-sm font-bold text-on-surface">Full Token Color Matrix</h2>
              <p className="text-body-sm text-on-surface-variant">
                Exact hex mappings as defined in the Yukta EduOS brand specification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Tokens */}
              <div className="p-5 rounded-container bg-surface-container-lowest border border-outline-variant/60 space-y-3">
                <h3 className="font-bold text-on-surface text-sm uppercase tracking-wider font-label-md">
                  Primary Roles (Emerald Deep)
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center p-2 rounded bg-primary text-on-primary">
                    <span>primary</span>
                    <span>#004f3a</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-primary-container text-on-primary-container">
                    <span>primary-container</span>
                    <span>#00694f</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-primary-fixed text-on-primary-fixed">
                    <span>primary-fixed</span>
                    <span>#9ff3d2</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-surface-tint text-white">
                    <span>surface-tint</span>
                    <span>#066b51</span>
                  </div>
                </div>
              </div>

              {/* Secondary & Tertiary */}
              <div className="p-6 rounded-2xl bg-white border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-4">
                <h3 className="font-bold text-on-surface text-sm uppercase tracking-wider font-label-md">
                  Secondary &amp; Tertiary
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-secondary text-on-secondary">
                    <span>secondary</span>
                    <span>#006c50</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-secondary-container text-on-secondary-container">
                    <span>secondary-container</span>
                    <span>#7cf9cb</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-tertiary text-on-tertiary">
                    <span>tertiary</span>
                    <span>#3c4741</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
                    <span>tertiary-fixed</span>
                    <span>#d9e6dd</span>
                  </div>
                </div>
              </div>

              {/* Surface Tonal Steps */}
              <div className="p-6 rounded-2xl bg-white border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-4">
                <h3 className="font-bold text-on-surface text-sm uppercase tracking-wider font-label-md">
                  Surface Steps &amp; Canvas
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-white border border-black/[0.06] text-on-surface">
                    <span>surface-container-lowest</span>
                    <span>#ffffff</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#f8f9fa] text-on-surface">
                    <span>surface-container-low</span>
                    <span>#f3f3f6</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#eeeef0] text-on-surface">
                    <span>surface-container</span>
                    <span>#eeeef0</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-[#e8e8ea] text-on-surface">
                    <span>surface-container-high</span>
                    <span>#e8e8ea</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CORE COMPONENTS */}
        {activeTab === "components" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">Core Component Library</h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Pre-built building blocks strictly conforming to the 8px grid and hairline border specifications.
              </p>
            </div>

            {/* Input & Form Controls */}
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-4">
              <h3 className="font-bold text-on-surface text-sm uppercase tracking-wider">
                Input Fields (with label and emerald focus transition)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="Official Course Identifier"
                  placeholder="e.g. CS-704"
                  helperText="Required university catalog sequence"
                />
                <Input
                  label="Supercomputing Node Allocation"
                  placeholder="e.g. 4x H100 SXM5"
                  defaultValue="2x H100 SXM5"
                />
                <Input
                  label="Academic Quota (Error State)"
                  placeholder="Invalid value"
                  error="Quota allocation exceeds department limit"
                />
              </div>
            </div>

            {/* Status Badges */}
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-4">
              <h3 className="font-bold text-on-surface text-sm uppercase tracking-wider">
                Status Badges (Low-opacity fills &amp; semantic colors)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Academic Primary</Badge>
                <Badge variant="success">ABET Accredited</Badge>
                <Badge variant="warning">Verification Pending</Badge>
                <Badge variant="danger">Quota Depleted</Badge>
                <Badge variant="info">Colloquium Open</Badge>
                <Badge variant="outline">Open Audit Track</Badge>
              </div>
            </div>

            {/* Course Card Component Specimen */}
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-4">
              <h3 className="font-bold text-on-surface text-sm uppercase tracking-wider">
                Course Card Specimen
              </h3>
              <div className="max-w-md border border-black/[0.04] bg-white rounded-3xl overflow-hidden shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_30px_rgba(0,105,79,0.08)] transition-all">
                <div className="h-36 bg-[#eeeef0] relative p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 bg-white rounded-lg shadow-2xs">
                      CS-704
                    </span>
                    <Badge variant="success">Accredited</Badge>
                  </div>
                  <div className="text-xs text-on-surface-variant font-mono">
                    Autumn 2026 • 4.0 ECTS
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-on-surface">
                      Distributed Systems &amp; Large-Scale Neural Architecture
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                      Kernel optimization, FlashAttention-3 implementation, and multi-node InfiniBand collective communication.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-on-surface-variant font-mono">
                      <span>Cohort Progress</span>
                      <span className="font-bold text-primary">Week 6 of 14</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#eeeef0] overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "42%" }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-black/[0.04]">
                    <span className="text-xs text-on-surface-variant font-mono">
                      64x H100 Fabric
                    </span>
                    <Button variant="primary" size="sm">
                      Inspect Syllabus
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI GLASSMORPHIC SURFACES */}
        {activeTab === "ai" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">AI Glassmorphism &amp; Assist Features</h2>
              <p className="text-sm text-on-surface-variant mt-1">
                "AI Surfaces: Elements powered by AI features use a glassmorphic background blur (12px) with a semi-transparent white fill (opacity 70%) to signify intelligence layering over standard data."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Surface 1 */}
              <GlassCard ai className="p-6 md:p-8 space-y-5 rounded-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AIAssistChip label="Yukta Neural Auditor" />
                    <span className="text-xs text-on-surface-variant font-mono">v4.2</span>
                  </div>
                  <span className="text-xs text-primary font-mono font-bold">12px Blur • 70% Opacity</span>
                </div>

                <h3 className="text-xl font-bold text-on-surface">
                  Autonomous Code Benchmark &amp; PyTorch Profiler
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Real-time kernel telemetry analyzing GPU memory bandwidth, compute throughput, and roofline efficiency on NVIDIA H100 nodes.
                </p>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-xs font-mono text-primary space-y-1">
                  <div>✓ TFLOPS Utilization: 84.2% of Peak FP16</div>
                  <div>✓ KV-Cache Compression: 3.8x Speedup</div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button variant="primary" size="sm">
                    Run AI Benchmark
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profiling Trace
                  </Button>
                </div>
              </GlassCard>

              {/* AI Surface 2 */}
              <GlassCard ai className="p-6 md:p-8 space-y-5 rounded-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AIAssistChip label="Syllabus Copilot" />
                    <span className="text-xs text-on-surface-variant font-mono">FERPA Compliant</span>
                  </div>
                  <span className="text-xs text-primary font-mono font-bold">Level 2 Focus</span>
                </div>

                <h3 className="text-xl font-bold text-on-surface">
                  Intelligent Research Synthesis &amp; Reading Guide
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Synthesizes relevant NeurIPS and ICLR publications into actionable lab prerequisites for prospective graduate candidates.
                </p>

                <div className="p-4 bg-[#f8f9fa] border border-black/[0.04] rounded-2xl text-xs font-mono text-on-surface-variant space-y-1">
                  <div>• Paper: FlashAttention-2 (Dao, 2023) [arXiv:2307.08691]</div>
                  <div>• Suggested prerequisite: CUDA Kernel Optimization (CS-610)</div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button variant="secondary" size="sm">
                    Ask Course Question
                  </Button>
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

