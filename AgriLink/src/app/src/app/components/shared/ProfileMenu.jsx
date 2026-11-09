import { useState, useRef, useEffect } from 'react'

export function ProfileMenu({ user, unread, onNotifications, onHistory, onLogout }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initial = (user.companyName || user.name || 'U').charAt(0).toUpperCase()

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-primary transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
          {initial}
        </div>
        <span className="hidden sm:block text-sm font-medium text-foreground">{user.companyName || user.name}</span>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
        <svg className={`w-4 h-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-border rounded-xl shadow-xl py-2 w-52 z-50">
          <div className="px-4 py-2 border-b border-border mb-1">
            <p className="font-medium text-sm text-foreground truncate">{user.companyName || user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <button onClick={() => { onNotifications(); setOpen(false) }}
            className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3">
            <span>🔔</span>
            <span>Notifications</span>
            {unread > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unread}</span>}
          </button>
          <button onClick={() => { onHistory(); setOpen(false) }}
            className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3">
            <span>📋</span>
            <span>History</span>
          </button>
          <div className="border-t border-border mt-1 pt-1">
            <button onClick={() => { onLogout(); setOpen(false) }}
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
