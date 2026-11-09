import { useState } from 'react'
import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'
import { PendingApprovals } from './PendingApprovals'
import { FarmerManagement } from './FarmerManagement'
import { IndustryManagement } from './IndustryManagement'

export function AdminDashboard({ user }) {
  const { users, products, orders, logout } = useApp()
  const [section, setSection] = useState('overview')

  const pending = users.filter(u => u.status === 'pending' && u.type !== 'admin')
  const farmers = users.filter(u => u.type === 'farmer')
  const industries = users.filter(u => u.type === 'industry')

  if (section === 'pending') return <PendingApprovals onBack={() => setSection('overview')} />
  if (section === 'farmers') return <FarmerManagement onBack={() => setSection('overview')} />
  if (section === 'industries') return <IndustryManagement onBack={() => setSection('overview')} />

  const stats = [
    { label: 'Pending Approvals', value: pending.length, icon: '⏳', color: 'bg-yellow-100 text-yellow-700', action: 'pending' },
    { label: 'Total Farmers', value: farmers.length, icon: '🌱', color: 'bg-green-100 text-green-700', action: 'farmers' },
    { label: 'Total Industries', value: industries.length, icon: '🏭', color: 'bg-blue-100 text-blue-700', action: 'industries' },
    { label: 'Total Products', value: products.length, icon: '📦', color: 'bg-purple-100 text-purple-700', action: null },
    { label: 'Total Orders', value: orders.length, icon: '🤝', color: 'bg-orange-100 text-orange-700', action: null },
    { label: 'Revenue', value: `₹${orders.reduce((s, o) => s + o.totalAmount, 0).toLocaleString()}`, icon: '💰', color: 'bg-emerald-100 text-emerald-700', action: null },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">AgriConnect Management</p>
          </div>
          <button onClick={logout}
            className="text-sm text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {pending.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏳</span>
              <div>
                <p className="font-semibold text-foreground">{pending.length} Pending Approval{pending.length > 1 ? 's' : ''}</p>
                <p className="text-sm text-muted-foreground">New registrations waiting for your review</p>
              </div>
            </div>
            <button onClick={() => setSection('pending')}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
              Review Now
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => stat.action && setSection(stat.action)}
              className={`bg-white rounded-xl p-5 shadow-sm border border-border ${stat.action ? 'cursor-pointer hover:border-primary hover:shadow-md' : ''} transition-all duration-200`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color} mb-3 text-xl`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              {stat.action && <div className="text-xs text-primary mt-1">Click to manage →</div>}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => setSection('pending')}
            className="bg-white border border-border rounded-xl p-6 text-left hover:border-primary hover:shadow-md transition-all duration-200 shadow-sm"
          >
            <span className="text-3xl mb-3 block">⏳</span>
            <h3 className="text-lg font-bold text-foreground mb-1">Pending Approvals</h3>
            <p className="text-sm text-muted-foreground">{pending.length} requests waiting</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setSection('farmers')}
            className="bg-white border border-border rounded-xl p-6 text-left hover:border-primary hover:shadow-md transition-all duration-200 shadow-sm"
          >
            <span className="text-3xl mb-3 block">🌱</span>
            <h3 className="text-lg font-bold text-foreground mb-1">Farmer Management</h3>
            <p className="text-sm text-muted-foreground">{farmers.length} registered farmers</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setSection('industries')}
            className="bg-white border border-border rounded-xl p-6 text-left hover:border-primary hover:shadow-md transition-all duration-200 shadow-sm"
          >
            <span className="text-3xl mb-3 block">🏭</span>
            <h3 className="text-lg font-bold text-foreground mb-1">Industry Management</h3>
            <p className="text-sm text-muted-foreground">{industries.length} registered industries</p>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
