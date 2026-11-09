import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'

export function NotificationsPanel({ user, onBack }) {
  const { getUserNotifications, markNotificationsRead } = useApp()
  const notifications = getUserNotifications(user.id)

  useEffect(() => {
    markNotificationsRead(user.id)
  }, [user.id, markNotificationsRead])

  const iconMap = { success: '✅', warning: '⚠️', info: 'ℹ️' }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">← Back</button>
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-xl font-bold text-foreground mb-2">No Notifications</h2>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-start gap-4"
              >
                <span className="text-xl mt-0.5">{iconMap[notif.type] || 'ℹ️'}</span>
                <div className="flex-1">
                  <p className="text-foreground text-sm">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
