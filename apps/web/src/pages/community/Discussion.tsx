import React, { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { useAuthStore } from "../../stores/auth-store"
import { Input } from "../../components/ui/Input"

export interface ThreadReply {
  id: string
  author: string
  role: "Faculty" | "Teaching Fellow" | "Research Scholar"
  text: string
  time: string
  upvotes: number
  isFacultyEndorsed?: boolean
}

export interface Thread {
  id: string
  title: string
  category: string
  courseCode: string
  author: string
  authorRole: "Faculty" | "Teaching Fellow" | "Research Scholar"
  timestamp: string
  upvotes: number
  isSolved: boolean
  isBookmarked?: boolean
  content: string
  codeSnippet?: string
  tags: string[]
  replies: ThreadReply[]
}

const INITIAL_THREADS: Thread[] = [
  {
    id: "thread-1",
    title: "KV-Cache memory fragmentation in Triton block attention with context length > 16k",
    category: "Systems & Kernels",
    courseCode: "CS-704",
    author: "Dhruv Varma",
    authorRole: "Research Scholar",
    timestamp: "2 hours ago",
    upvotes: 24,
    isSolved: true,
    isBookmarked: false,
    content: "When allocating scratch buffers for the causal mask under sequence lengths past 16,384 tokens, peak VRAM allocations spike intermittently before the torch allocator triggers a compaction stall. Setting expandable_segments in PyTorch allocator mitigates latency, but does not completely eliminate bank conflicts during SRAM register spilling.",
    codeSnippet: `# PyTorch Memory Allocator Optimization
import torch
import os

os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True,max_split_size_mb:128"
torch.cuda.empty_cache()`,
    tags: ["CS-704", "PyTorch", "CUDA", "KV-Cache", "Triton"],
    replies: [
      {
        id: "rep-1",
        author: "Dr. Ananya Sharma",
        role: "Faculty",
        text: "Verified. Setting expandable_segments:True uses virtual memory address space reservation instead of contiguous physical chunks. In Triton 3.0, you should also pass block_size=128 to match the H100 SM register file page width.",
        time: "1 hour ago",
        upvotes: 18,
        isFacultyEndorsed: true
      },
      {
        id: "rep-2",
        author: "Vikram Malhotra",
        role: "Teaching Fellow",
        text: "Additionally, check your tile-stride dimensions in kernel_args. The FP16 accumulator requires 32-bit register alignment to avoid half-precision hardware stalls.",
        time: "45 mins ago",
        upvotes: 7
      }
    ]
  },
  {
    id: "thread-2",
    title: "ZeRO-3 gradient accumulation all-reduce stragglers across inter-node InfiniBand partitions",
    category: "Distributed Algorithms",
    courseCode: "CS-602",
    author: "Vikram Malhotra",
    authorRole: "Teaching Fellow",
    timestamp: "5 hours ago",
    upvotes: 31,
    isSolved: false,
    isBookmarked: true,
    content: "We observed a 32% throughput drop during Ring-AllReduce synchronizations on Cluster Node 4B. Hardware telemetry indicates packet retransmits on the secondary InfiniBand queue pair (mlx5_2). Verify NCCL_IB_DISABLE and collective routing configurations across Slurm job environments.",
    codeSnippet: `# Check NCCL InfiniBand Environment Variables
export NCCL_DEBUG=INFO
export NCCL_IB_DISABLE=0
export NCCL_IB_HCA=mlx5_1,mlx5_2
export NCCL_NET_GDR_LEVEL=3`,
    tags: ["CS-602", "DeepSpeed", "InfiniBand", "NCCL", "Slurm"],
    replies: [
      {
        id: "rep-3",
        author: "Dhruv Varma",
        role: "Research Scholar",
        text: "We tested NCCL_NET_GDR_LEVEL=3 on Node 4A and confirmed zero GPU-Direct RDMA bottlenecks once the PCIe ACS (Access Control Services) override was applied.",
        time: "3 hours ago",
        upvotes: 9
      }
    ]
  },
  {
    id: "thread-3",
    title: "Clarification on Lab 5: Custom Direct Preference Optimization loss margin formulation",
    category: "Model Alignment",
    courseCode: "SEC-620",
    author: "Kavya Patel",
    authorRole: "Research Scholar",
    timestamp: "1 day ago",
    upvotes: 16,
    isSolved: true,
    isBookmarked: false,
    content: "In equation 3 of the Rafailov et al. (2023) paper, should the beta parameter scale the implicit reward difference prior to the log-sigmoid operation? Dr. Rao mentioned in seminar that beta = 0.1 is the calibrated default for Lab 5 evaluation on GSM8k reasoning tasks.",
    codeSnippet: `# DPO Loss Formulation in PyTorch
def dpo_loss(pi_logratios, ref_logratios, beta=0.1):
    logits = pi_logratios - ref_logratios
    losses = -torch.nn.functional.logsigmoid(beta * logits)
    return losses.mean()`,
    tags: ["SEC-620", "DPO", "Alignment", "RLHF"],
    replies: [
      {
        id: "rep-4",
        author: "Dr. Sunita Rao",
        role: "Faculty",
        text: "Correct Kavya. Beta = 0.1 prevents KL divergence collapse toward the reference model. If your loss plateaus near 0.693 (ln 2), double check that the reference model weights are strictly frozen (requires_grad=False).",
        time: "18 hours ago",
        upvotes: 22,
        isFacultyEndorsed: true
      }
    ]
  },
  {
    id: "thread-4",
    title: "Laboratory Cluster Maintenance Window: October 28, 02:00 – 04:00 UTC",
    category: "Colloquium Announcements",
    courseCode: "General",
    author: "Dr. Ananya Sharma",
    authorRole: "Faculty",
    timestamp: "2 days ago",
    upvotes: 45,
    isSolved: false,
    isBookmarked: false,
    content: "The HPC cluster partition will undergo scheduled driver updates to CUDA 12.6.2 and kernel firmware patches for NVLink-4 switches. Please commit and checkpoint all running distributed training batches prior to 01:45 UTC. Slurm reservations will resume at 04:15 UTC.",
    tags: ["HPC", "ClusterOps", "Notice", "Maintenance"],
    replies: [
      {
        id: "rep-5",
        author: "Rohan Kulkarni",
        role: "Research Scholar",
        text: "Will scratch disk contents on /scratch/nvme be preserved across the reboot?",
        time: "1 day ago",
        upvotes: 4
      },
      {
        id: "rep-6",
        author: "Dr. Ananya Sharma",
        role: "Faculty",
        text: "Yes, local NVMe scratch mounts are non-volatile, but distributed NFS shares will experience temporary unmounts during the window.",
        time: "1 day ago",
        upvotes: 11,
        isFacultyEndorsed: true
      }
    ]
  }
]

export const Discussion: React.FC = () => {
  const { profile } = useAuthStore()
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [statusFilter, setStatusFilter] = useState<"All" | "Solved" | "Open" | "Bookmarked">("All")
  const [selectedThreadId, setSelectedThreadId] = useState<string>(INITIAL_THREADS[0].id)
  const [searchQuery, setSearchQuery] = useState("")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Reply state
  const [replyText, setReplyText] = useState("")

  // New thread composer state
  const [showComposer, setShowComposer] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newCategory, setNewCategory] = useState("Systems & Kernels")
  const [newCourse, setNewCourse] = useState("CS-704")
  const [newContent, setNewContent] = useState("")
  const [newCodeSnippet, setNewCodeSnippet] = useState("")
  const [newTags, setNewTags] = useState("")

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Active Thread
  const activeThread = useMemo(() => {
    return threads.find(t => t.id === selectedThreadId) || threads[0]
  }, [threads, selectedThreadId])

  // Category List
  const categories = [
    "All",
    "Systems & Kernels",
    "Distributed Algorithms",
    "Model Alignment",
    "Colloquium Announcements"
  ]

  // Filtered Threads
  const filteredThreads = useMemo(() => {
    return threads.filter(t => {
      const matchesCategory = selectedCategory === "All" || t.category === selectedCategory
      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Solved"
          ? t.isSolved
          : statusFilter === "Open"
          ? !t.isSolved
          : Boolean(t.isBookmarked)

      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.author.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesStatus && matchesSearch
    })
  }, [threads, selectedCategory, statusFilter, searchQuery])

  // Handlers
  const handleToggleThreadUpvote = (id: string) => {
    setThreads(prev =>
      prev.map(t => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    )
    showToast("Endorsement recorded for research topic.")
  }

  const handleToggleSolved = (id: string) => {
    setThreads(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextVal = !t.isSolved
          showToast(nextVal ? "Thread marked as Solved ✓." : "Thread reopened for discussion.")
          return { ...t, isSolved: nextVal }
        }
        return t
      })
    )
  }

  const handleToggleBookmark = (id: string) => {
    setThreads(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextVal = !t.isBookmarked
          showToast(nextVal ? "Discussion thread saved to bookmarks." : "Thread removed from bookmarks.")
          return { ...t, isBookmarked: nextVal }
        }
        return t
      })
    )
  }

  const handleReplyUpvote = (threadId: string, replyId: string) => {
    setThreads(prev =>
      prev.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            replies: t.replies.map(r => (r.id === replyId ? { ...r, upvotes: r.upvotes + 1 } : r))
          }
        }
        return t
      })
    )
    showToast("Upvoted peer response.")
  }

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim() || !activeThread) return

    const newReply: ThreadReply = {
      id: `rep-${Date.now()}`,
      author: profile?.displayName || "Dr. Ananya Sharma",
      role: profile?.role === "trainer" ? "Faculty" : profile?.role === "admin" ? "Faculty" : "Research Scholar",
      text: replyText.trim(),
      time: "Just now",
      upvotes: 1
    }

    setThreads(prev =>
      prev.map(t => {
        if (t.id === activeThread.id) {
          return {
            ...t,
            replies: [...t.replies, newReply]
          }
        }
        return t
      })
    )

    setReplyText("")
    showToast("Your formal response has been posted to the colloquium thread.")
  }

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    const tagList = newTags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)

    if (!tagList.includes(newCourse)) {
      tagList.unshift(newCourse)
    }

    const newThreadObj: Thread = {
      id: `thread-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      courseCode: newCourse,
      author: profile?.displayName || "Dr. Ananya Sharma",
      authorRole: profile?.role === "trainer" ? "Faculty" : "Research Scholar",
      timestamp: "Just now",
      upvotes: 1,
      isSolved: false,
      isBookmarked: false,
      content: newContent.trim(),
      codeSnippet: newCodeSnippet.trim() ? newCodeSnippet.trim() : undefined,
      tags: tagList,
      replies: []
    }

    setThreads([newThreadObj, ...threads])
    setSelectedThreadId(newThreadObj.id)
    setShowComposer(false)
    setNewTitle("")
    setNewContent("")
    setNewCodeSnippet("")
    setNewTags("")
    showToast(`Discussion topic "${newThreadObj.title}" published successfully.`)
  }

  // Telemetry counts
  const totalDiscussions = threads.length
  const totalReplies = threads.reduce((acc, t) => acc + t.replies.length, 0)
  const solvedRate = Math.round((threads.filter(t => t.isSolved).length / threads.length) * 100)

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
                <Link to="/courses" className="text-xs font-semibold text-[#00694f] hover:underline flex items-center gap-1">
                  <span>← Curricula</span>
                </Link>
                <span className="text-gray-300">/</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  ACADEMIC RESEARCH COLLOQUIUM
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Peer Review &amp; Systems Research Forum
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-3xl leading-relaxed">
                Asynchronous technical inquiries, distributed kernel debugging, mathematical proof consultations, and verified faculty endorsements.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setShowComposer(true)}
                className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>+ Start Discussion Topic</span>
              </button>
            </div>
          </div>
        </div>

        {/* Community Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-black/[0.04] shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Active Topics</span>
            <div className="text-2xl font-bold text-[#111827] font-mono">{totalDiscussions} Threads</div>
            <div className="text-xs text-gray-500">Across 3 academic tracks</div>
          </div>

          <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-[#00694f] uppercase tracking-wider font-mono">Resolution Rate</span>
            <div className="text-2xl font-bold text-[#00694f] font-mono">{solvedRate}% Solved</div>
            <div className="text-xs text-emerald-700">Verified solution consensus</div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-black/[0.04] shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Total Peer Contributions</span>
            <div className="text-2xl font-bold text-[#111827] font-mono">{totalReplies} Responses</div>
            <div className="text-xs text-gray-500">Faculty &amp; scholar feedback</div>
          </div>

          <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-[#00694f] uppercase tracking-wider font-mono">Faculty Response SLA</span>
            <div className="text-2xl font-bold text-[#00694f] font-mono">&lt; 45 Mins</div>
            <div className="text-xs text-emerald-700">Priority teaching fellow review</div>
          </div>
        </div>

        {/* Category Pills & Filters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#00694f] text-white shadow-xs font-semibold"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Status Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search research threads, kernel keywords, tags, or authors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {(["All", "Solved", "Open", "Bookmarked"] as const).map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === st
                      ? "bg-[#111827] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {st === "Solved" ? "Solved ✓" : st === "Open" ? "Open ⏳" : st === "Bookmarked" ? "Saved ★" : "All Threads"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Master-Detail Discussion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: THREADS LEDGER (5 cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-500 font-mono px-1">
              <span>TOPICS LEDGER ({filteredThreads.length})</span>
              <span>SORT: RECENT FIRST</span>
            </div>

            <div className="space-y-3">
              {filteredThreads.length === 0 ? (
                <div className="p-12 bg-white rounded-3xl border border-black/[0.04] text-center text-xs text-gray-400 font-mono">
                  No discussions found matching filter criteria.
                </div>
              ) : (
                filteredThreads.map(thread => {
                  const isSelected = thread.id === activeThread?.id
                  return (
                    <article
                      key={thread.id}
                      onClick={() => setSelectedThreadId(thread.id)}
                      className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                        isSelected
                          ? "bg-white border-[#00694f] shadow-[0px_4px_24px_rgba(0,105,79,0.08)] ring-1 ring-[#00694f]"
                          : "bg-white border-black/[0.04] hover:border-gray-300 shadow-xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#00694f] border border-emerald-100">
                            {thread.courseCode}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">{thread.timestamp}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {thread.isSolved ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#00694f] font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                              Solved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Open
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-900 text-sm leading-snug">
                        {thread.title}
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {thread.content}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {thread.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-[11px] text-gray-500 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800">{thread.author}</span>
                          <span className="text-[10px] text-gray-400">({thread.authorRole})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>▲ {thread.upvotes}</span>
                          <span>💬 {thread.replies.length}</span>
                        </div>
                      </div>
                    </article>
                  )
                })
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: ACTIVE THREAD READER & RESPONSE COMPOSER (7 cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            {activeThread ? (
              <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
                
                {/* Thread Header Meta */}
                <div className="space-y-3 border-b border-black/[0.04] pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#00694f] font-mono text-xs font-bold border border-emerald-100">
                        {activeThread.courseCode}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{activeThread.category}</span>
                    </div>

                    {/* Interactive Action Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleThreadUpvote(activeThread.id)}
                        className="py-1 px-3 rounded-lg border border-gray-200 hover:border-[#00694f] hover:text-[#00694f] text-gray-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Endorse this technical inquiry"
                      >
                        <span>▲ Upvote</span>
                        <span className="font-mono">({activeThread.upvotes})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(activeThread.id)}
                        className={`py-1 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                          activeThread.isBookmarked
                            ? "border-amber-300 bg-amber-50 text-amber-800"
                            : "border-gray-200 hover:border-gray-400 text-gray-700"
                        }`}
                      >
                        <span>{activeThread.isBookmarked ? "★ Saved" : "☆ Save"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleSolved(activeThread.id)}
                        className={`py-1 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                          activeThread.isSolved
                            ? "border-emerald-300 bg-emerald-50 text-[#00694f]"
                            : "border-gray-200 hover:border-emerald-500 text-gray-700"
                        }`}
                      >
                        <span>{activeThread.isSolved ? "✓ Solved" : "Mark Solved"}</span>
                      </button>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
                    {activeThread.title}
                  </h2>

                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                    <span>Initiated by <strong className="text-gray-900">{activeThread.author}</strong> ({activeThread.authorRole})</span>
                    <span>•</span>
                    <span>{activeThread.timestamp}</span>
                  </div>
                </div>

                {/* Original Question Content */}
                <div className="space-y-4">
                  <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {activeThread.content}
                  </div>

                  {/* Code Snippet Box */}
                  {activeThread.codeSnippet && (
                    <div className="rounded-2xl bg-[#111827] text-gray-100 p-4 font-mono text-xs overflow-x-auto border border-gray-800 space-y-2 shadow-inner">
                      <div className="flex justify-between items-center text-[10px] text-gray-400 border-b border-gray-800 pb-2">
                        <span>KERNEL SOURCE SNIPPET</span>
                        <span>PYTHON / TRITON</span>
                      </div>
                      <pre className="text-emerald-400 leading-relaxed">
                        <code>{activeThread.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Tag Pill Strip */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {activeThread.tags.map(tag => (
                      <span key={tag} className="font-mono text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responses Section */}
                <div className="space-y-4 pt-6 border-t border-black/[0.04]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-base">
                      Faculty &amp; Peer Contributions ({activeThread.replies.length})
                    </h3>
                    <span className="text-xs font-mono text-gray-400">Institutional Review Ledger</span>
                  </div>

                  <div className="space-y-4">
                    {activeThread.replies.map(reply => (
                      <div
                        key={reply.id}
                        className={`p-5 rounded-2xl border transition-all space-y-2.5 ${
                          reply.isFacultyEndorsed
                            ? "bg-emerald-50/40 border-emerald-200 shadow-xs"
                            : "bg-gray-50/70 border-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{reply.author}</span>
                            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                              reply.role === "Faculty"
                                ? "bg-[#00694f] text-white"
                                : reply.role === "Teaching Fellow"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-200 text-gray-700"
                            }`}>
                              {reply.role}
                            </span>
                            {reply.isFacultyEndorsed && (
                              <span className="font-mono text-[10px] font-bold text-[#00694f] flex items-center gap-1">
                                <span>🎓 Faculty Endorsed</span>
                              </span>
                            )}
                          </div>
                          <span className="text-gray-400 font-mono text-[11px]">{reply.time}</span>
                        </div>

                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                          {reply.text}
                        </p>

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => handleReplyUpvote(activeThread.id, reply.id)}
                            className="py-1 px-2.5 rounded-lg border border-gray-200 hover:border-[#00694f] text-gray-600 hover:text-[#00694f] text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>▲ Helpful</span>
                            <span>({reply.upvotes})</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Response Composer */}
                  <form onSubmit={handlePostReply} className="pt-6 border-t border-black/[0.04] space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider font-mono">
                        Contribute Formal Response
                      </label>
                      <span className="text-[11px] font-mono text-gray-400">
                        Posting as: <strong className="text-gray-800">{profile?.displayName || "Dr. Ananya Sharma"}</strong>
                      </span>
                    </div>

                    <textarea
                      rows={4}
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Provide technical feedback, verified command lines, mathematical derivations, or hardware profiling notes..."
                      className="w-full p-4 rounded-2xl border border-gray-200 text-xs font-mono text-gray-900 bg-white focus:outline-none focus:border-[#00694f] shadow-inner"
                      required
                    />

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-gray-400 font-mono">
                        Markdown &amp; Python indentation supported
                      </span>
                      <button
                        type="submit"
                        className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
                      >
                        Post Formal Response →
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="p-16 bg-white rounded-3xl border border-black/[0.04] text-center text-gray-400 font-mono text-xs">
                Select a research topic from the left ledger to review inquiries and verified contributions.
              </div>
            )}
          </div>
        </div>

        {/* Start Discussion Topic Modal */}
        {showComposer && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xl p-8 max-w-lg w-full space-y-6 animate-scale-up">
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Publish Technical Inquiry</h3>
                  <p className="text-xs text-gray-500 font-mono">Academic Research Colloquium</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowComposer(false)}
                  className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateThread} className="space-y-4">
                <Input
                  label="Inquiry / Topic Title"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Memory bank conflict in FlashAttention SRAM tiling"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-mono">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 bg-white focus:outline-none focus:border-[#00694f]"
                    >
                      <option value="Systems & Kernels">Systems &amp; Kernels</option>
                      <option value="Distributed Algorithms">Distributed Algorithms</option>
                      <option value="Model Alignment">Model Alignment</option>
                      <option value="Colloquium Announcements">Colloquium Announcements</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-mono">
                      Curriculum Association
                    </label>
                    <select
                      value={newCourse}
                      onChange={e => setNewCourse(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 bg-white focus:outline-none focus:border-[#00694f]"
                    >
                      <option value="CS-704">CS-704: Advanced ML Systems</option>
                      <option value="CS-602">CS-602: Distributed OS</option>
                      <option value="SEC-620">SEC-620: Model Safety</option>
                      <option value="General">General Engineering</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-mono">
                    Technical Inquiry Body
                  </label>
                  <textarea
                    rows={4}
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    placeholder="Describe your technical inquiry, hardware environment, compiler logs, or theoretical proof bottleneck..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs font-sans text-gray-900 focus:outline-none focus:border-[#00694f]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-mono">
                    Code / Shell Snippet (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={newCodeSnippet}
                    onChange={e => setNewCodeSnippet(e.target.value)}
                    placeholder="Paste minimal reproducible Python/CUDA kernel or Slurm commands..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 focus:outline-none focus:border-[#00694f]"
                  />
                </div>

                <Input
                  label="Topic Tags (comma-separated)"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  placeholder="e.g. PyTorch, CUDA, Roofline, Memory"
                />

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowComposer(false)}
                    className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Publish Inquiry →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Academic Colloquium Protocol
      </footer>
    </div>
  )
}
