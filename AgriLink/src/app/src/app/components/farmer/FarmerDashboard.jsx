import { useState } from 'react'
import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'
import { useLanguage } from '../contexts/LanguageContext'
import { FarmerSelling } from './FarmerSelling'
import { FarmerHistory } from './FarmerHistory'
import { NotificationsPanel } from '../shared/NotificationsPanel'
import { ProfileMenu } from '../shared/ProfileMenu'

export function FarmerDashboard({ user }) {
  const { products, orders, getUserNotifications, logout } = useApp()
  const { t } = useLanguage()
  const [section, setSection] = useState('dashboard')

  const farmerProducts = products.filter(p => p.farmerId === user.id)
  const farmerOrders = orders.filter(o => o.farmerId === user.id)
  const totalRevenue = farmerOrders.reduce((s, o) => s + o.totalAmount, 0)
  const notifications = getUserNotifications(user.id)
  const unread = notifications.filter(n => !n.read).length

  if (section === 'selling') return <FarmerSelling user={user} onBack={() => setSection('dashboard')} />
  if (section === 'history') return <FarmerHistory user={user} onBack={() => setSection('dashboard')} />
  if (section === 'notifications') return <NotificationsPanel user={user} onBack={() => setSection('dashboard')} />

  const stats = [
    { label: 'My Products', value: farmerProducts.length, icon: '📦', color: 'bg-green-100 text-green-700' },
    { label: 'Total Sales', value: farmerOrders.length, icon: '🤝', color: 'bg-blue-100 text-blue-700' },
    { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Notifications', value: unread, icon: '🔔', color: 'bg-purple-100 text-purple-700' },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <div className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Welcome, {user.name} 🌱</h1>
            <p className="text-sm text-muted-foreground">Farmer Dashboard</p>
          </div>
          <ProfileMenu
            user={user}
            unread={unread}
            onNotifications={() => setSection('notifications')}
            onHistory={() => setSection('history')}
            onLogout={logout}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-border"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color} mb-3 text-xl`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => setSection('selling')}
            className="bg-primary text-primary-foreground rounded-xl p-6 text-left hover:bg-primary/90 transition-colors duration-200 shadow-sm"
          >
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="text-lg font-bold mb-1">Start Selling</h3>
            <p className="text-sm opacity-90">Manage your products and listings</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setSection('history')}
            className="bg-white border border-border rounded-xl p-6 text-left hover:border-primary hover:shadow-md transition-all duration-200 shadow-sm"
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-lg font-bold text-foreground mb-1">Selling History</h3>
            <p className="text-sm text-muted-foreground">View past deals and transactions</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setSection('notifications')}
            className="bg-white border border-border rounded-xl p-6 text-left hover:border-primary hover:shadow-md transition-all duration-200 shadow-sm relative"
          >
            {unread > 0 && (
              <span className="absolute top-4 right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unread}</span>
            )}
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="text-lg font-bold text-foreground mb-1">Notifications</h3>
            <p className="text-sm text-muted-foreground">{unread} unread notifications</p>
          </motion.button>
        </div>

        {/* Recent products */}
        {farmerProducts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">My Products</h2>
              <button onClick={() => setSection('selling')}
                className="text-sm text-primary hover:underline font-medium">View All →</button>
            </div>
            <div className="space-y-3">
              {farmerProducts.slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.quantity} {p.unit} available • ₹{p.price}/{p.unit}</div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{p.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
