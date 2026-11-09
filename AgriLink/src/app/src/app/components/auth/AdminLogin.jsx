import { useState } from 'react'
import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'

export function AdminLogin({ onSuccess, onBack }) {
  const { loginAdmin } = useApp()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await loginAdmin(form.email, form.password)
      if (result.error) { setError(result.error); return }
      onSuccess(result.user)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🌾</span>
          </div>
          <span className="text-xl font-bold text-foreground">AgriConnect Admin</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">🛡️ Admin Login</h1>
        <p className="text-muted-foreground mb-6">Sign in with admin credentials</p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="admin@agriconnect.in"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-60">
            {loading ? 'Signing in...' : 'Admin Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={onBack} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
            ← Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
