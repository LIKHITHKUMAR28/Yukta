import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../stores/auth-store"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"

// Types
type AdminTab = "analytics" | "users" | "courses" | "payments" | "moderation" | "notifications" | "settings"

interface ManagedUser {
  id: string
  name: string
  email: string
  role: "student" | "trainer" | "admin"
  status: "active" | "suspended"
  institution: string
  joined: string
}

interface ManagedCourse {
  code: string
  title: string
  instructor: string
  department: string
  enrolled: number
  status: "approved" | "pending" | "archived"
  featured: boolean
}

interface Transaction {
  id: string
  student: string
  course: string
  amount: string
  date: string
  status: "settled" | "refunded"
}

interface FlaggedContent {
  id: string
  type: "Discussion Post" | "Code Snippet" | "Comment"
  author: string
  reason: string
  excerpt: string
  date: string
}

interface Broadcast {
  id: string
  channel: "Push" | "Email" | "In-App"
  audience: string
  title: string
  time: string
  delivered: string
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()

  const [activeTab, setActiveTab] = useState<AdminTab>("analytics")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleLogout = async () => {
    await signOut()
    navigate("/login")
  }

  // --- STATE: USERS ---
  const [usersList, setUsersList] = useState<ManagedUser[]>([
    { id: "USR-001", name: "Dhruv Varma", email: "dhruv.varma@university.edu", role: "student", status: "active", institution: "IIT Bombay", joined: "2026-09-01" },
    { id: "USR-002", name: "Dr. Ananya Sharma", email: "ananya.sharma@yuktaedu.os", role: "trainer", status: "active", institution: "IISc Bangalore", joined: "2026-08-15" },
    { id: "USR-003", name: "Prof. Jayant Venkataraman", email: "j.venkat@iitm.ac.in", role: "trainer", status: "active", institution: "IIT Madras", joined: "2026-08-20" },
    { id: "USR-004", name: "Priya Sharma", email: "priya.sharma@iit.ac.in", role: "student", status: "active", institution: "IIT Bombay", joined: "2026-09-05" },
    { id: "USR-005", name: "Rohan Kulkarni", email: "rohan.k@iitr.ac.in", role: "student", status: "suspended", institution: "IIT Roorkee", joined: "2026-09-10" },
    { id: "USR-006", name: "Dr. Vikram Malhotra", email: "vikram.malhotra@yuktaedu.os", role: "trainer", status: "active", institution: "IIT Delhi", joined: "2026-08-10" },
  ])
  const [userSearch, setUserSearch] = useState("")
  const [userRoleFilter, setUserRoleFilter] = useState<"all" | "student" | "trainer" | "admin">("all")
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState<"student" | "trainer" | "admin">("student")
  const [newUserInstitution, setNewUserInstitution] = useState("")

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserName.trim() || !newUserEmail.trim()) return
    const newUser: ManagedUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      status: "active",
      institution: newUserInstitution.trim() || "Yukta Consortium Scholar",
      joined: new Date().toISOString().split("T")[0],
    }
    setUsersList([newUser, ...usersList])
    setShowAddUserModal(false)
    setNewUserName("")
    setNewUserEmail("")
    setNewUserInstitution("")
    showToast(`User ${newUser.name} created successfully with role ${newUser.role.toUpperCase()}.`)
  }

  const handleToggleSuspendUser = (id: string) => {
    setUsersList(usersList.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "active" ? "suspended" : "active"
        showToast(`User ${u.name} status updated to ${nextStatus.toUpperCase()}.`)
        return { ...u, status: nextStatus }
      }
      return u
    }))
  }

  const handleChangeUserRole = (id: string, newRole: "student" | "trainer" | "admin") => {
    setUsersList(usersList.map(u => {
      if (u.id === id) {
        showToast(`User ${u.name} reassigned to role ${newRole.toUpperCase()}.`)
        return { ...u, role: newRole }
      }
      return u
    }))
  }

  const handleDeleteUser = (id: string) => {
    const target = usersList.find(u => u.id === id)
    setUsersList(usersList.filter(u => u.id !== id))
    showToast(`User ${target?.name || id} removed from institution directory.`)
  }

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
    const matchesRole = userRoleFilter === "all" || u.role === userRoleFilter
    return matchesSearch && matchesRole
  })

  // --- STATE: COURSES ---
  const [coursesList, setCoursesList] = useState<ManagedCourse[]>([
    { code: "CS-704", title: "Distributed GPU Systems & Collective Communication", instructor: "Dr. Ananya Sharma", department: "Computer Science", enrolled: 76, status: "approved", featured: true },
    { code: "SEC-620", title: "Formal Verification & Cryptographic Synthesis", instructor: "Dr. Vikram Malhotra", department: "Model Safety", enrolled: 32, status: "approved", featured: true },
    { code: "MTH-801", title: "Nonlinear PDEs & Scientific Computing", instructor: "Prof. Meera Subramanian", department: "Applied Mathematics", enrolled: 34, status: "approved", featured: false },
    { code: "AI-715", title: "Multimodal Foundation Architectures & Speculative Decoding", instructor: "Prof. Jayant Venkataraman", department: "Computer Science", enrolled: 48, status: "pending", featured: false },
    { code: "BIO-509", title: "Computational Structural Proteomics", instructor: "Dr. Sunita Rao", department: "Bioengineering", enrolled: 19, status: "archived", featured: false },
  ])

  const handleApproveCourse = (code: string) => {
    setCoursesList(coursesList.map(c => c.code === code ? { ...c, status: "approved" } : c))
    showToast(`Course ${code} accredited and approved for enrollment.`)
  }

  const handleArchiveCourse = (code: string) => {
    setCoursesList(coursesList.map(c => c.code === code ? { ...c, status: c.status === "archived" ? "approved" : "archived" } : c))
    showToast(`Course ${code} status toggled.`)
  }

  const handleToggleFeatureCourse = (code: string) => {
    setCoursesList(coursesList.map(c => c.code === code ? { ...c, featured: !c.featured } : c))
    showToast(`Course ${code} featured status updated.`)
  }

  // --- STATE: PAYMENTS ---
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "TX-9021", student: "Dhruv Varma", course: "CS-704", amount: "$1,250.00", date: "2026-09-20", status: "settled" },
    { id: "TX-9020", student: "Priya Sharma", course: "CS-704", amount: "$1,250.00", date: "2026-09-19", status: "settled" },
    { id: "TX-9019", student: "Rohan Kulkarni", course: "SEC-620", amount: "$1,450.00", date: "2026-09-18", status: "settled" },
    { id: "TX-9018", student: "Kavya Patel", course: "MTH-801", amount: "$950.00", date: "2026-09-16", status: "settled" },
    { id: "TX-9017", student: "Arjun Nair", course: "AI-715", amount: "$1,250.00", date: "2026-09-14", status: "refunded" },
  ])

  const handleRefund = (id: string) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, status: "refunded" } : t))
    showToast(`Transaction ${id} refunded successfully. Funds returned to candidate.`)
  }

  // --- STATE: MODERATION ---
  const [flaggedItems, setFlaggedItems] = useState<FlaggedContent[]>([
    { id: "FLG-101", type: "Discussion Post", author: "Student STU-882104", reason: "Potential homework solution disclosure", excerpt: "Here is the exact CUDA kernel solution for Homework 3 shared memory tiling...", date: "2 hours ago" },
    { id: "FLG-102", type: "Comment", author: "Auditor STU-49102", reason: "Disrespectful academic discourse", excerpt: "Your mathematical derivation makes zero sense, read a real textbook before posting.", date: "1 day ago" },
    { id: "FLG-103", type: "Code Snippet", author: "Student STU-30911", reason: "Embedded external API keys detected", excerpt: "export SERVICE_API_KEY='secret_token_redacted_mock...'", date: "2 days ago" },
  ])

  const handleDismissFlag = (id: string) => {
    setFlaggedItems(flaggedItems.filter(f => f.id !== id))
    showToast(`Flag ${id} dismissed. Content approved.`)
  }

  const handleRemoveContent = (id: string) => {
    setFlaggedItems(flaggedItems.filter(f => f.id !== id))
    showToast(`Content ${id} redacted and removed from colloquium.`)
  }

  // --- STATE: NOTIFICATIONS ---
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([
    { id: "BC-501", channel: "Push", audience: "All Campus Scholars", title: "Cluster Maintenance: H100 partitions restart tonight at 02:00 UTC", time: "1 day ago", delivered: "100% (218/218)" },
    { id: "BC-502", channel: "Email", audience: "Faculty Fellows Only", title: "Autumn 2026 Midterm Grade Submission Deadline Reminder", time: "3 days ago", delivered: "100% (18/18)" },
    { id: "BC-503", channel: "In-App", audience: "Computer Science Dept", title: "Guest Colloquium: Dr. Karpathy on Autonomous Code Synthesis", time: "5 days ago", delivered: "98% (140/142)" },
  ])
  const [notifChannel, setNotifChannel] = useState<"Push" | "Email" | "In-App">("Push")
  const [notifAudience, setNotifAudience] = useState("All Campus Scholars")
  const [notifTitle, setNotifTitle] = useState("")
  const [notifBody, setNotifBody] = useState("")

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault()
    if (!notifTitle.trim()) return
    const newBroadcast: Broadcast = {
      id: `BC-${Math.floor(100 + Math.random() * 900)}`,
      channel: notifChannel,
      audience: notifAudience,
      title: notifTitle.trim(),
      time: "Just now",
      delivered: "Queued for instant transmission",
    }
    setBroadcasts([newBroadcast, ...broadcasts])
    setNotifTitle("")
    setNotifBody("")
    showToast(`Broadcast [${notifChannel}] successfully transmitted to ${notifAudience}.`)
  }

  // --- STATE: SETTINGS ---
  const [platformName, setPlatformName] = useState("Yukta EduOS • Department of Computing")
  const [maxGpuHours, setMaxGpuHours] = useState("120")
  const [enablePublicAudit, setEnablePublicAudit] = useState(true)
  const [enableHpcTerminal, setEnableHpcTerminal] = useState(true)
  const [enableAiGrading, setEnableAiGrading] = useState(true)
  const [enableBlockchainTranscripts, setEnableBlockchainTranscripts] = useState(true)

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    showToast("Platform configurations and feature flags successfully updated.")
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

      {/* Main Admin Console Container */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00694f] border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00694f]" />
                  INSTITUTIONAL ADMINISTRATION
                </span>
                <span className="font-mono text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
                  Registrar Authority: <strong className="text-gray-800">{user?.uid ? user.uid.slice(0, 8).toUpperCase() : "ADM-001"}</strong>
                </span>
                <span className="font-mono text-xs text-gray-400">Autumn 2026 Term</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Academic Governance &amp; Executive Console
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-3xl leading-relaxed">
                Platform-wide scholar management, curriculum board approvals, supercomputing cluster allocations, and institutional revenue oversight.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/admin/offline-enrollment"
                className="py-2.5 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-2"
              >
                <span>Registrar Matriculation</span>
                <span>→</span>
              </Link>
              <Link
                to="/verify-certificate"
                className="py-2.5 px-4 bg-[#eeeef0] hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium transition-all"
              >
                Verify Credentials
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="py-2.5 px-4 bg-white border border-gray-200 hover:border-red-200 hover:text-red-600 text-gray-600 rounded-xl text-xs font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Tab Navigation Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-8 border-t border-black/[0.04] mt-8 no-scrollbar">
            {[
              { id: "analytics", label: "Analytics & Telemetry", icon: "📊" },
              { id: "users", label: `User Management (${usersList.length})`, icon: "👥" },
              { id: "courses", label: `Course Governance (${coursesList.length})`, icon: "📚" },
              { id: "payments", label: "Payment & Revenue", icon: "💳" },
              { id: "moderation", label: `Content Moderation (${flaggedItems.length})`, icon: "🛡️" },
              { id: "notifications", label: "Broadcast Notifications", icon: "📢" },
              { id: "settings", label: "Platform Settings", icon: "⚙️" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
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
        {/* TAB 1: ANALYTICS & TELEMETRY */}
        {/* ========================================================================= */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-fade-in">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Accredited Scholars</span>
                <div className="text-2xl font-bold text-[#00694f] font-mono">142 Candidates</div>
                <div className="text-xs text-gray-500">318 Open Audit Scholars</div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Supercomputing Fabric</span>
                <div className="text-2xl font-bold text-[#111827] font-mono">64x H100 SXM5</div>
                <div className="text-xs text-emerald-600 font-semibold">3,420 / 4,800 GPU Hours active</div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Gross Platform Revenue</span>
                <div className="text-2xl font-bold text-[#111827] font-mono">$154,900.00</div>
                <div className="text-xs text-gray-500">Autumn 2026 Settled Accounts</div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Curriculum Syllabi</span>
                <div className="text-2xl font-bold text-[#111827] font-mono">35 Accredited</div>
                <div className="text-xs text-[#00694f] font-semibold">100% ABET / ECTS Mapped</div>
              </div>
            </div>

            {/* Department Distribution & Audit Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Department Cohorts (8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#111827] tracking-tight">Academic Divisions &amp; Cohort Distribution</h2>
                    <p className="text-xs text-gray-500">Live candidate headcounts across research departments</p>
                  </div>
                  <Link to="/courses" className="text-xs font-semibold text-[#00694f] hover:underline">
                    Catalog Directory →
                  </Link>
                </div>

                <div className="space-y-3">
                  {[
                    { code: "DEPT-CS", name: "Distributed Systems & Machine Learning", courses: 14, faculty: 8, enrolled: 76 },
                    { code: "DEPT-SEC", name: "Formal Verification & Model Safety", courses: 9, faculty: 4, enrolled: 32 },
                    { code: "DEPT-MTH", name: "Applied Mathematics & Mathematical Physics", courses: 12, faculty: 6, enrolled: 34 },
                  ].map(d => (
                    <div key={d.code} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#00694f] font-bold">{d.code}</span>
                          <span className="font-bold text-[#111827] text-sm">{d.name}</span>
                        </div>
                        <div className="text-gray-500 text-[11px] mt-0.5">
                          {d.courses} Active Syllabi • {d.faculty} Research Chairs &amp; Fellows
                        </div>
                      </div>
                      <div className="font-mono text-xs text-gray-900 bg-white px-3 py-1.5 rounded-xl border border-gray-200/60 shadow-2xs self-start sm:self-auto">
                        <strong className="text-[#00694f] font-bold">{d.enrolled}</strong> Enrolled Candidates
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Ledger (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
                <div className="border-b border-black/[0.04] pb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00694f]">
                    GOVERNANCE
                  </span>
                  <h3 className="text-lg font-bold text-[#111827] tracking-tight mt-1">
                    Institutional Audit Logs
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "AUD-891", type: "Curriculum Approval", desc: "CS-704 v3.4 accredited for Autumn 2026 ECTS transfer.", time: "1 day ago" },
                    { id: "AUD-890", type: "Cluster Quota Expansion", desc: "Added 16x H100 partitions to cluster-h100-eu4 pool.", time: "3 days ago" },
                    { id: "AUD-889", type: "Transcript Notarization", desc: "Batch signed 42 graduate transcripts with SHA-256 ledger.", time: "5 days ago" },
                  ].map(a => (
                    <div key={a.id} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 text-xs">
                      <div className="flex justify-between items-center font-mono text-[11px]">
                        <span className="text-[#00694f] font-bold">{a.type}</span>
                        <span className="text-gray-400">{a.time}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{a.desc}</p>
                      <div className="font-mono text-[10px] text-gray-400 pt-0.5">ID: {a.id}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: USER MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === "users" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.04] pb-6">
              <div>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight">Institutional Scholar &amp; Faculty Directory</h2>
                <p className="text-xs text-gray-500 mt-0.5">Manage user credentials, assign system roles, and govern account clearance.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddUserModal(true)}
                className="py-2.5 px-4 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <span>+ Create New User</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {(["all", "student", "trainer", "admin"] as const).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setUserRoleFilter(role)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all capitalize cursor-pointer ${
                      userRoleFilter === role
                        ? "bg-[#111827] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {role === "all" ? "All Users" : role === "trainer" ? "Faculty" : role}
                  </button>
                ))}
              </div>
              <div className="w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#00694f]"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-mono text-[11px]">
                    <th className="py-3 px-4 font-semibold">User Profile</th>
                    <th className="py-3 px-4 font-semibold">Institution</th>
                    <th className="py-3 px-4 font-semibold">Role Clearance</th>
                    <th className="py-3 px-4 font-semibold">Account Status</th>
                    <th className="py-3 px-4 font-semibold">Registered</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00694f] font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-100">
                            {u.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{u.name}</div>
                            <div className="text-[11px] text-gray-400 font-mono">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{u.institution}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={u.role}
                          onChange={e => handleChangeUserRole(u.id, e.target.value as "student" | "trainer" | "admin")}
                          className="px-2 py-1 rounded-lg border border-gray-200 text-[11px] font-semibold uppercase font-mono bg-white cursor-pointer"
                        >
                          <option value="student">Student</option>
                          <option value="trainer">Faculty</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                          u.status === "active" ? "bg-emerald-50 text-[#00694f]" : "bg-red-50 text-red-700"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-[#00694f]" : "bg-red-600"}`} />
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-400 font-mono text-[11px]">{u.joined}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleSuspendUser(u.id)}
                            className="px-2.5 py-1 rounded-lg border border-gray-200 hover:border-gray-400 text-gray-600 text-[11px] font-medium transition-all cursor-pointer"
                          >
                            {u.status === "active" ? "Suspend" : "Activate"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id)}
                            className="px-2.5 py-1 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 text-[11px] font-medium transition-all cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Create User Modal */}
            {showAddUserModal && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xl p-8 max-w-md w-full space-y-6 animate-scale-up">
                  <div className="flex justify-between items-center border-b border-black/[0.04] pb-3">
                    <h3 className="font-bold text-lg text-gray-900">Create Academic Profile</h3>
                    <button
                      type="button"
                      onClick={() => setShowAddUserModal(false)}
                      className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <Input
                      label="Legal Full Name"
                      required
                      value={newUserName}
                      onChange={e => setNewUserName(e.target.value)}
                      placeholder="e.g. John von Neumann"
                    />

                    <Input
                      label="University Email"
                      required
                      type="email"
                      value={newUserEmail}
                      onChange={e => setNewUserEmail(e.target.value)}
                      placeholder="scholar@university.edu"
                    />

                    <Input
                      label="Institution / Department"
                      value={newUserInstitution}
                      onChange={e => setNewUserInstitution(e.target.value)}
                      placeholder="e.g. Cambridge University"
                    />

                    <div className="space-y-1">
                      <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                        Assign Initial Role
                      </label>
                      <select
                        value={newUserRole}
                        onChange={e => setNewUserRole(e.target.value as "student" | "trainer" | "admin")}
                        className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-sm text-[#111827] focus:outline-none focus:border-[#00694f]"
                      >
                        <option value="student">Student Scholar</option>
                        <option value="trainer">Faculty Fellow / Instructor</option>
                        <option value="admin">Institutional Registrar Admin</option>
                      </select>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddUserModal(false)}
                        className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium shadow-sm"
                      >
                        Create User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: COURSE MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.04] pb-6">
              <div>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight">Curriculum Board &amp; Course Governance</h2>
                <p className="text-xs text-gray-500 mt-0.5">Accredit new syllabi, toggle homepage featured courses, and archive deprecated modules.</p>
              </div>
              <Link
                to="/courses"
                className="py-2.5 px-4 bg-[#eeeef0] hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium transition-all"
              >
                View Public Catalog →
              </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-mono text-[11px]">
                    <th className="py-3 px-4 font-semibold">Course Code &amp; Title</th>
                    <th className="py-3 px-4 font-semibold">Department</th>
                    <th className="py-3 px-4 font-semibold">Instructor</th>
                    <th className="py-3 px-4 font-semibold">Enrolled</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Featured</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {coursesList.map(c => (
                    <tr key={c.code} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div>
                          <div className="font-bold text-[#111827] flex items-center gap-2">
                            <span className="font-mono text-[#00694f]">{c.code}</span>
                            <span>{c.title}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{c.department}</td>
                      <td className="py-3.5 px-4 text-gray-900 font-medium">{c.instructor}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#00694f]">{c.enrolled} Candidates</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                          c.status === "approved" ? "bg-emerald-50 text-[#00694f]" : c.status === "pending" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatureCourse(c.code)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all ${
                            c.featured ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-gray-100 text-gray-400 hover:text-gray-700"
                          }`}
                        >
                          {c.featured ? "★ Featured" : "☆ Promote"}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {c.status === "pending" ? (
                            <button
                              type="button"
                              onClick={() => handleApproveCourse(c.code)}
                              className="px-2.5 py-1 rounded-lg bg-[#00694f] hover:bg-[#00523e] text-white text-[11px] font-medium transition-all cursor-pointer"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleArchiveCourse(c.code)}
                              className="px-2.5 py-1 rounded-lg border border-gray-200 hover:border-gray-400 text-gray-600 text-[11px] font-medium transition-all cursor-pointer"
                            >
                              {c.status === "archived" ? "Unarchive" : "Archive"}
                            </button>
                          )}
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
        {/* TAB 4: PAYMENT DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === "payments" && (
          <div className="space-y-6 animate-fade-in">
            {/* Revenue Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Gross Tuition Receipts</span>
                <div className="text-2xl font-bold text-[#111827] font-mono">$142,500.00</div>
                <div className="text-xs text-gray-500">114 Accredited ECTS Enrollments</div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">HPC Lab Grants Received</span>
                <div className="text-2xl font-bold text-[#00694f] font-mono">$12,400.00</div>
                <div className="text-xs text-gray-500">Department Research Endowments</div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Pending Disputes &amp; Refunds</span>
                <div className="text-2xl font-bold text-gray-600 font-mono">$0.00</div>
                <div className="text-xs text-emerald-600 font-semibold">All accounts settled with registrar</div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#111827] tracking-tight">Institutional Financial Ledger</h2>
                  <p className="text-xs text-gray-500">Settled course tuitions, department voucher transactions, and refund auditing.</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-gray-100">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-mono text-[11px]">
                      <th className="py-3 px-4 font-semibold">Transaction ID</th>
                      <th className="py-3 px-4 font-semibold">Scholar Legal Name</th>
                      <th className="py-3 px-4 font-semibold">Curriculum</th>
                      <th className="py-3 px-4 font-semibold">Amount</th>
                      <th className="py-3 px-4 font-semibold">Date Settled</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map(t => (
                      <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#00694f]">{t.id}</td>
                        <td className="py-3.5 px-4 font-semibold text-gray-900">{t.student}</td>
                        <td className="py-3.5 px-4 font-mono text-gray-600">{t.course}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{t.amount}</td>
                        <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">{t.date}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                            t.status === "settled" ? "bg-emerald-50 text-[#00694f]" : "bg-red-50 text-red-700"
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {t.status === "settled" ? (
                            <button
                              type="button"
                              onClick={() => handleRefund(t.id)}
                              className="px-2.5 py-1 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 text-[11px] font-medium transition-all cursor-pointer"
                            >
                              Issue Refund
                            </button>
                          ) : (
                            <span className="text-gray-400 text-[11px] font-mono">Refunded</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CONTENT MODERATION */}
        {/* ========================================================================= */}
        {activeTab === "moderation" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6 animate-fade-in">
            <div className="border-b border-black/[0.04] pb-4">
              <h2 className="text-xl font-bold text-[#111827] tracking-tight">Colloquium &amp; Research Discussion Moderation Desk</h2>
              <p className="text-xs text-gray-500 mt-0.5">Review reported posts, protect academic honor code, and sanitize proprietary code disclosures.</p>
            </div>

            {flaggedItems.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100 text-gray-500 text-xs">
                All reported items have been reviewed and resolved. The colloquium forum is clear.
              </div>
            ) : (
              <div className="space-y-4">
                {flaggedItems.map(f => (
                  <div key={f.id} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-4 text-xs">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                        <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">{f.id}</span>
                        <span className="text-gray-700 font-semibold">{f.type}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">Author: {f.author}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{f.date}</span>
                      </div>
                      <div className="text-red-700 font-semibold text-xs">
                        Reported Reason: <span className="font-normal text-gray-800">{f.reason}</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-gray-200/80 font-mono text-[11px] text-gray-700 leading-relaxed">
                        {f.excerpt}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        type="button"
                        onClick={() => handleDismissFlag(f.id)}
                        className="py-2 px-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium transition-all cursor-pointer"
                      >
                        Dismiss Flag
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveContent(f.id)}
                        className="py-2 px-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer"
                      >
                        Redact &amp; Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: NOTIFICATION MANAGER */}
        {/* ========================================================================= */}
        {activeTab === "notifications" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Broadcast Composer (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
              <div className="border-b border-black/[0.04] pb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00694f]">
                  DISPATCH CONSOLE
                </span>
                <h2 className="text-xl font-bold text-[#111827] tracking-tight mt-1">
                  Draft Campus Broadcast
                </h2>
                <p className="text-xs text-gray-500">Send urgent notices, seminar updates, or maintenance schedules.</p>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Dispatch Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Push", "Email", "In-App"] as const).map(ch => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setNotifChannel(ch)}
                        className={`py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                          notifChannel === ch
                            ? "bg-[#00694f] text-white border-[#00694f] shadow-xs font-semibold"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Target Academic Audience
                  </label>
                  <select
                    value={notifAudience}
                    onChange={e => setNotifAudience(e.target.value)}
                    className="w-full h-11 rounded-xl border border-black/[0.08] bg-white px-3.5 text-xs text-[#111827] focus:outline-none focus:border-[#00694f]"
                  >
                    <option value="All Campus Scholars">All Campus Scholars (218 Recipients)</option>
                    <option value="Graduate Students Only">Graduate Students Only (142 Recipients)</option>
                    <option value="Faculty Chairs Only">Faculty Chairs &amp; Fellows (18 Recipients)</option>
                    <option value="Computer Science Dept">Department of Computer Science (76 Recipients)</option>
                  </select>
                </div>

                <Input
                  label="Notification Title / Subject"
                  required
                  value={notifTitle}
                  onChange={e => setNotifTitle(e.target.value)}
                  placeholder="e.g. Cluster H100 Node Rebalance"
                />

                <div className="space-y-1">
                  <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Notice Description
                  </label>
                  <textarea
                    rows={4}
                    value={notifBody}
                    onChange={e => setNotifBody(e.target.value)}
                    placeholder="Enter full broadcast text transmission..."
                    className="w-full rounded-xl border border-black/[0.08] bg-white p-3 text-xs text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#00694f]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl font-medium text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Transmit Broadcast Notice</span>
                  <span>→</span>
                </button>
              </form>
            </div>

            {/* Broadcast History (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-6">
              <div className="border-b border-black/[0.04] pb-4">
                <h3 className="text-xl font-bold text-[#111827] tracking-tight">Transmission History Ledger</h3>
                <p className="text-xs text-gray-500">Record of dispatched push notifications and verified email transmissions.</p>
              </div>

              <div className="space-y-3">
                {broadcasts.map(b => (
                  <div key={b.id} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="font-bold text-[#00694f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{b.id}</span>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-gray-200 font-semibold text-gray-800">{b.channel}</span>
                        <span className="text-gray-500">Target: {b.audience}</span>
                      </div>
                      <span className="text-gray-400 font-mono text-[11px]">{b.time}</span>
                    </div>
                    <div className="font-bold text-gray-900 text-sm">{b.title}</div>
                    <div className="text-[11px] text-emerald-700 font-mono font-medium">✓ {b.delivered}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: SETTINGS & GOVERNANCE */}
        {/* ========================================================================= */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-8 space-y-8 animate-fade-in max-w-4xl">
            <div className="border-b border-black/[0.04] pb-4">
              <h2 className="text-xl font-bold text-[#111827] tracking-tight">Institution Governance &amp; Platform Configuration</h2>
              <p className="text-xs text-gray-500 mt-0.5">Manage platform branding, supercomputing quotas, and feature flags.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-8">
              {/* Branding & Metadata */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-mono">Academic Branding &amp; Quotas</h3>
                
                <Input
                  label="Institutional Campus Name"
                  value={platformName}
                  onChange={e => setPlatformName(e.target.value)}
                />

                <Input
                  label="Default GPU Hours Quota per Scholar (H100 Partition)"
                  value={maxGpuHours}
                  onChange={e => setMaxGpuHours(e.target.value)}
                />
              </div>

              {/* Feature Flags */}
              <div className="space-y-4 pt-4 border-t border-black/[0.04]">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-mono">Autonomous Platform Feature Flags</h3>
                
                <div className="space-y-3">
                  {[
                    { label: "Public Guest Auditing", desc: "Allow non-matriculated scholars to audit course video archives without ECTS credit.", state: enablePublicAudit, toggle: () => setEnablePublicAudit(!enablePublicAudit) },
                    { label: "HPC Web Terminal & JupyterLab Integration", desc: "Provision browser-based GPU container shells directly in scholar workspaces.", state: enableHpcTerminal, toggle: () => setEnableHpcTerminal(!enableHpcTerminal) },
                    { label: "Autonomous AI Research & Grading Assistance", desc: "Deploy Claude 3.5 Sonnet / Gemini models for instant feedback on code assignments.", state: enableAiGrading, toggle: () => setEnableAiGrading(!enableAiGrading) },
                    { label: "Cryptographic SHA-256 Transcript Notarization", desc: "Automatically sign and register completed course transcripts to public verification registry.", state: enableBlockchainTranscripts, toggle: () => setEnableBlockchainTranscripts(!enableBlockchainTranscripts) },
                  ].map((flag, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-gray-900 text-xs">{flag.label}</div>
                        <div className="text-[11px] text-gray-500 leading-relaxed">{flag.desc}</div>
                      </div>
                      <button
                        type="button"
                        onClick={flag.toggle}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                          flag.state ? "bg-[#00694f]" : "bg-gray-300"
                        }`}
                      >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          flag.state ? "translate-x-6" : "translate-x-0"
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-8 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer"
                >
                  Save Platform Configuration
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Institutional Governance Protocol
      </footer>
    </div>
  )
}
