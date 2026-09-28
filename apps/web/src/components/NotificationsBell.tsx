import React, { useState } from "react"
import { Bell, Check, Sparkles } from "lucide-react"

export const NotificationsBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Course Enrolled", message: "Your simulation checkout for CS-704 was verified.", read: false, time: "10m ago" },
    { id: 2, title: "Syllabus Updated", message: "Dr. Ananya Sharma updated FlashAttention-3 lecture notes.", read: false, time: "1h ago" },
    { id: 3, title: "Registry Verified", message: "ECTS transcript verification service is operational.", read: true, time: "Yesterday" },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open notifications"
        className="relative w-9 h-9 bg-white hover:bg-[#eeeef0] rounded-xl flex items-center justify-center text-on-surface-variant hover:text-primary border border-black/[0.06] transition-all shadow-xs cursor-pointer"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2.5 w-80 sm:w-96 rounded-2xl border border-black/[0.06] bg-white shadow-[0px_12px_36px_rgba(0,105,79,0.08)] p-4 z-50 space-y-3 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-2.5 border-b border-black/[0.04]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-on-surface">
                  Academic Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-bold">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-[11px] text-primary hover:text-primary-container flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    notif.read
                      ? "border-black/[0.04] bg-[#f8f9fa] opacity-75"
                      : "border-primary/20 bg-[#f0fdf4]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-on-surface">{notif.title}</h4>
                    <span className="text-[10px] font-mono text-outline shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-1">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

