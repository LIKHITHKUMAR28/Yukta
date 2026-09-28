import React from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { AIAssistChip } from "../../components/ui/AIAssistChip"
import { Button } from "../../components/ui/Button"

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f4f5f8] text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed font-sans">
      <Header />

      {/* Institutional Mission Header */}
      <header className="border-b border-black/[0.04] bg-[#f8f9fa]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-primary px-3 py-1 border border-primary/20 bg-primary/10 rounded-xl">
                ACADEMIC CHARTER &amp; MISSION
              </span>
              <AIAssistChip label="AI Sovereign Learning Architecture" size="sm" />
              <span className="text-xs font-mono text-on-surface-variant bg-[#eeeef0] px-3 py-1 rounded-xl">
                ESTABLISHED 2024
              </span>
            </div>

            <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-on-surface tracking-tight leading-tight">
              Advancing engineering research and educational compute sovereignty.
            </h1>

            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              Yukta EduOS was established to address the critical resource gap between corporate artificial intelligence research labs and university classrooms, providing students and faculty with direct access to high-performance computing clusters and peer-reviewed curricula.
            </p>
          </div>
        </div>
      </header>

      {/* Main Narrative & Governance Layout */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-16">
        {/* Core Institutional Objectives (Asymmetric 2-column) */}
        <section aria-labelledby="objectives-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Foundation</span>
            <h2 id="objectives-heading" className="text-2xl font-bold text-on-surface">
              Our Academic Mandate
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Modern computer systems and artificial intelligence require hands-on experimentation on distributed multi-node hardware. Commercial software has increasingly locked advanced compute behind opaque proprietary APIs.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Yukta EduOS restores transparency by pairing foundational peer-reviewed mathematical theory with managed bare-metal compute infrastructure, ensuring every student directly controls their compilation pipeline, kernel optimization, and model training.
            </p>

            <div className="pt-2">
              <Link to="/courses">
                <Button variant="primary" size="md">
                  Explore Accredited Curricula
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="p-8 border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2.5">
              <div className="font-mono text-xs font-bold text-primary uppercase tracking-wider">COMMITMENT 01</div>
              <h3 className="text-lg font-bold text-on-surface">Open Science &amp; Free Audit Rights</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All syllabus outlines, lecture notes, slide decks, and code repositories are published under open-source licenses. Any self-directed student or educator globally may audit our courses without financial obligation.
              </p>
            </div>

            <div className="p-8 border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2.5">
              <div className="font-mono text-xs font-bold text-primary uppercase tracking-wider">COMMITMENT 02</div>
              <h3 className="text-lg font-bold text-on-surface">Dedicated Hardware Allocations</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                We believe practical engineering cannot be learned through toy web sandboxes. Enrolled degree cohort students receive guaranteed GPU tenancy on NVIDIA H100 partitions with high-speed InfiniBand interconnects.
              </p>
            </div>

            <div className="p-8 border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2.5">
              <div className="font-mono text-xs font-bold text-primary uppercase tracking-wider">COMMITMENT 03</div>
              <h3 className="text-lg font-bold text-on-surface">Accreditation Rigor and Transfer Credit</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Our curricula undergo formal review by the Academic Standards Committee and comply with the European Credit Transfer and Accumulation System (ECTS) and ABET engineering criteria.
              </p>
            </div>
          </div>
        </section>

        {/* AI Sovereign Computing Layer */}
        <section className="p-8 md:p-10 bg-white border border-black/[0.04] rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.04] pb-6">
            <div className="space-y-1.5">
              <AIAssistChip label="Yukta Neural Engine" size="md" />
              <h2 className="text-xl font-bold text-on-surface">
                Autonomous Academic Intelligence &amp; Telemetry
              </h2>
            </div>
            <span className="text-xs font-mono text-primary uppercase tracking-wider font-bold bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
              IEEE Spectrum &amp; ABET Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
              <div className="font-mono text-xs text-primary font-bold">01 / REASONING BENCHMARKS</div>
              <h3 className="text-sm font-bold text-on-surface">Kernel-Level Profiling</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Continuous tracing of IO-aware kernel latencies, instruction cache efficiency, and arithmetic intensity across compute clusters.
              </p>
            </div>
            <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
              <div className="font-mono text-xs text-primary font-bold">02 / CONTINUOUS PROOFING</div>
              <h3 className="text-sm font-bold text-on-surface">Formal Verification</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Mathematical proof validation for neural weight bounds, gradient variance stability, and constitutional alignment safety.
              </p>
            </div>
            <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
              <div className="font-mono text-xs text-primary font-bold">03 / SOVEREIGN RECORDS</div>
              <h3 className="text-sm font-bold text-on-surface">Cryptographic Credentialing</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                SHA-256 transcript verification anchored directly to academic registry keys, preserving student intellectual property.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Leadership Board with Real Faculty Portraits */}
        <section aria-labelledby="leadership-heading" className="space-y-6">
          <div className="border-b border-black/[0.04] pb-4">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Faculty Governance</span>
            <h2 id="leadership-heading" className="text-2xl font-bold text-on-surface mt-1">
              Curriculum Board &amp; Research Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 md:p-8 border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm shrink-0">
                <img
                  src="/images/faculty/sterling.jpg"
                  alt="Dr. Ananya Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-on-surface">Dr. Ananya Sharma, Ph.D.</h3>
                <div className="font-mono text-xs text-primary font-bold">Chair, Distributed Systems</div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Doctoral graduate from IIT Bombay / Stanford; 38 publications across NeurIPS, SOSP, and OSDI focusing on memory-efficient attention scheduling.
              </p>
            </div>

            <div className="p-6 md:p-8 border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm shrink-0">
                <img
                  src="/images/faculty/vane.jpg"
                  alt="Dr. Sunita Rao"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-on-surface">Dr. Sunita Rao, Ph.D.</h3>
                <div className="font-mono text-xs text-primary font-bold">Director, Safety &amp; Alignment</div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Postdoctoral fellow researching constitutional feedback systems, mathematical optimization, and empirical model red-teaming.
              </p>
            </div>

            <div className="p-6 md:p-8 border border-black/[0.04] bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm shrink-0">
                <img
                  src="/images/faculty/thorne.jpg"
                  alt="Vikram Malhotra"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-on-surface">Vikram Malhotra, M.S.</h3>
                <div className="font-mono text-xs text-primary font-bold">Supercomputing Cluster Architect</div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Systems engineer specializing in high-throughput network topologies, NVLink fabrics, and automated CI laboratory test harnesses.
              </p>
            </div>
          </div>
        </section>

        {/* Institutional Accreditation Summary */}
        <section aria-labelledby="accreditation-heading" className="border border-black/[0.04] bg-white p-8 md:p-10 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-6">
          <div className="border-b border-black/[0.04] pb-4">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Quality Assurance</span>
            <h2 id="accreditation-heading" className="text-2xl font-bold text-on-surface mt-1">
              Accreditation &amp; Institutional Compliance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-on-surface-variant">
            <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
              <h3 className="font-bold text-on-surface text-sm">ECTS Credit Mapping</h3>
              <p className="leading-relaxed">
                Each 1.0 ECTS credit corresponds to approximately 25 to 30 hours of student workload, comprising direct lecture seminars, laboratory sessions, reading assignments, and project deliverables.
              </p>
            </div>

            <div className="p-6 border border-black/[0.04] bg-[#f8f9fa] rounded-2xl space-y-2">
              <h3 className="font-bold text-on-surface text-sm">Data Privacy &amp; Student Records</h3>
              <p className="leading-relaxed">
                Yukta EduOS strictly adheres to FERPA regulations (34 CFR Part 99) and EU General Data Protection Regulation guidelines. Educational transcripts and code repositories remain the sole intellectual property of the student.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/courses">
                <Button variant="primary" size="md">
                  Inspect Accredited Curricula →
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="md">
                  Contact Registrar
                </Button>
              </Link>
              <Link to="/mentors">
                <Button variant="outline" size="md">
                  Meet Research Faculty
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
