import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"

interface SeminarSession {
  id: string
  title: string
  course: string
  speaker: string
  date: string
  time: string
  room: string
  status: "Scheduled" | "Live Now" | "Concluded"
  link: string
}

const INITIAL_SESSIONS: SeminarSession[] = [
  {
    id: "sem-1",
    title: "Seminar 4.1: Continuous Batching Schedulers & Virtual Memory Pages",
    course: "CS-704",
    speaker: "Dr. Ananya Sharma",
    date: "Today, Oct 15",
    time: "16:00 – 17:30 IST",
    room: "Virtual Lab Room 4B",
    status: "Live Now",
    link: "https://lab.yukta.edu/room/4b"
  },
  {
    id: "sem-2",
    title: "Office Hours: Debugging Distributed Tensor Parallelism Kernels",
    course: "CS-602",
    speaker: "Vikram Malhotra",
    date: "Tomorrow, Oct 16",
    time: "14:00 – 16:00 IST",
    room: "Virtual Lab Room 2A",
    status: "Scheduled",
    link: "https://lab.yukta.edu/room/2a"
  },
  {
    id: "sem-3",
    title: "Colloquium: Empirical Safety Red-Teaming & Contamination Audits",
    course: "SEC-620",
    speaker: "Dr. Sunita Rao",
    date: "Oct 19, 2026",
    time: "15:00 – 17:00 IST",
    room: "Virtual Auditorium A",
    status: "Scheduled",
    link: "https://lab.yukta.edu/room/aud-a"
  }
]

export const LiveClasses: React.FC = () => {
  const [sessions, setSessions] = useState<SeminarSession[]>(INITIAL_SESSIONS)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Schedule Modal State
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newCourse, setNewCourse] = useState("CS-704")
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")
  const [newRoom, setNewRoom] = useState("Virtual Lab Room 4B")
  const [newLink, setNewLink] = useState("https://lab.yukta.edu/room/4b")

  // Reschedule Modal State
  const [editingSession, setEditingSession] = useState<SeminarSession | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDate, setEditDate] = useState("")
  const [editTime, setEditTime] = useState("")
  const [editRoom, setEditRoom] = useState("")

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newObj: SeminarSession = {
      id: `sem-${Date.now()}`,
      title: newTitle.trim(),
      course: newCourse,
      speaker: "Dr. Ananya Sharma",
      date: newDate || "Oct 24, 2026",
      time: newTime || "16:00 UTC",
      room: newRoom || "Virtual Lab Room 4B",
      status: "Scheduled",
      link: newLink || "https://lab.yukta.edu/room/4b"
    }

    setSessions([newObj, ...sessions])
    setNewTitle("")
    setShowScheduleModal(false)
    showToast(`Live session "${newObj.title}" scheduled successfully.`)
  }

  const handleOpenReschedule = (session: SeminarSession) => {
    setEditingSession(session)
    setEditTitle(session.title)
    setEditDate(session.date)
    setEditTime(session.time)
    setEditRoom(session.room)
  }

  const handleSaveReschedule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSession) return

    setSessions(sessions.map(s => {
      if (s.id === editingSession.id) {
        return {
          ...s,
          title: editTitle.trim(),
          date: editDate.trim(),
          time: editTime.trim(),
          room: editRoom.trim()
        }
      }
      return s
    }))

    showToast(`Session ${editingSession.id} rescheduled to ${editDate} at ${editTime}.`)
    setEditingSession(null)
  }

  const handleDeleteSession = (id: string) => {
    const target = sessions.find(s => s.id === id)
    setSessions(sessions.filter(s => s.id !== id))
    showToast(`Session "${target?.title || id}" cancelled and removed.`)
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
                  SYNCHRONOUS SEMINARS &amp; OFFICE HOURS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Live Masterclasses &amp; Virtual Office Hours
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
                Schedule, reschedule, broadcast, and moderate interactive technical seminars, GPU kernel walkthroughs, and colloquium defenses.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <Link
                to="/trainer/attendance"
                className="py-2.5 px-4 bg-emerald-50 border border-emerald-200 text-[#00694f] hover:bg-emerald-100 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span>📋 Attendance Roll</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowScheduleModal(true)}
                className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>+ Schedule Live Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Active &amp; Upcoming Broadcast Schedule ({sessions.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map(session => (
              <div
                key={session.id}
                className="bg-white rounded-3xl border border-black/[0.04] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] p-6 space-y-4 flex flex-col justify-between hover:border-gray-200 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-[#00694f] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                      {session.course}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                      session.status === "Live Now"
                        ? "bg-emerald-50 text-[#00694f] border border-emerald-200 animate-pulse"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${session.status === "Live Now" ? "bg-[#00694f]" : "bg-gray-400"}`} />
                      {session.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{session.title}</h3>

                  <div className="space-y-1 text-xs text-gray-500 font-mono text-[11px]">
                    <div>Host: <strong className="text-gray-800">{session.speaker}</strong></div>
                    <div>Room: <span className="text-gray-800">{session.room}</span></div>
                    <div>Schedule: <span className="text-gray-900 font-bold">{session.date} • {session.time}</span></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.04] space-y-2">
                  <a
                    href={session.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center py-2.5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium transition-all shadow-sm"
                  >
                    Join Live Stream →
                  </a>

                  <Link
                    to={`/trainer/attendance?course=${session.course}&session=${encodeURIComponent(session.title)}`}
                    className="block w-full text-center py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-[#00694f] rounded-xl text-xs font-semibold transition-all"
                  >
                    Mark Attendance Roll →
                  </Link>

                  {/* Reschedule & Delete Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenReschedule(session)}
                      className="py-1.5 px-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-all cursor-pointer"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSession(session.id)}
                      className="py-1.5 px-2 bg-white hover:bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xl p-8 max-w-md w-full space-y-6 animate-scale-up">
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-3">
                <h3 className="font-bold text-lg text-gray-900">Broadcast New Seminar Session</h3>
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddSession} className="space-y-4">
                <Input
                  label="Session Title"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Seminar 4.2: PagedAttention KV-Cache"
                />

                <div className="space-y-1">
                  <label className="text-label-md font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Curriculum
                  </label>
                  <select
                    value={newCourse}
                    onChange={e => setNewCourse(e.target.value)}
                    className="w-full h-11 rounded-xl border border-black/[0.08] bg-white px-3 text-xs font-mono text-[#111827] focus:outline-none focus:border-[#00694f]"
                  >
                    <option value="CS-704">CS-704: Advanced ML Systems</option>
                    <option value="CS-602">CS-602: Distributed OS</option>
                    <option value="SEC-620">SEC-620: Model Safety</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    placeholder="e.g. Oct 24, 2026"
                  />
                  <Input
                    label="Time (UTC)"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    placeholder="e.g. 16:00 UTC"
                  />
                </div>

                <Input
                  label="Virtual Room Location"
                  value={newRoom}
                  onChange={e => setNewRoom(e.target.value)}
                  placeholder="e.g. Virtual Lab Room 4B"
                />

                <Input
                  label="Direct Meeting / Stream URL"
                  value={newLink}
                  onChange={e => setNewLink(e.target.value)}
                  placeholder="e.g. https://lab.yukta.edu/room/4b"
                />

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium shadow-sm cursor-pointer"
                  >
                    Schedule Broadcast
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {editingSession && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xl p-8 max-w-md w-full space-y-6 animate-scale-up">
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-3">
                <h3 className="font-bold text-lg text-gray-900">Reschedule Seminar Session</h3>
                <button
                  type="button"
                  onClick={() => setEditingSession(null)}
                  className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveReschedule} className="space-y-4">
                <Input
                  label="Session Title"
                  required
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="New Date"
                    required
                    value={editDate}
                    onChange={e => setEditDate(e.target.value)}
                    placeholder="e.g. Oct 26, 2026"
                  />
                  <Input
                    label="New Time (UTC)"
                    required
                    value={editTime}
                    onChange={e => setEditTime(e.target.value)}
                    placeholder="e.g. 17:00 UTC"
                  />
                </div>

                <Input
                  label="Room Location"
                  value={editRoom}
                  onChange={e => setEditRoom(e.target.value)}
                />

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSession(null)}
                    className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-[#00694f] hover:bg-[#00523e] text-white rounded-xl text-xs font-medium shadow-sm cursor-pointer"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-4 px-6 text-center text-xs text-gray-500 font-mono mt-12">
        Yukta EduOS • Department of Computing &amp; Advanced Engineering • Synchronous Colloquium Protocol
      </footer>
    </div>
  )
}
