import { useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { useApp } from '../contexts/AppContext'

export function IndustryLogin({ onSuccess, onRegister, onBack }) {
  const { t, language, changeLanguage, availableLanguages } = useLanguage()
  const { loginUser } = useApp()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('All fields are required'); return }
    setLoading(true)
    try {
      const result = await loginUser(form.email, form.password, 'industry')
      if (result.error === 'pending') { setError('Your account is pending admin approval.'); return }
      if (result.error === 'rejected') { setError('Your registration has been rejected.'); return }
      if (result.error) { setError(result.error); return }
      onSuccess(result.user)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center px-4">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {availableLanguages.map(lang => (
          <button key={lang.code} onClick={() => changeLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors duration-200 text-black ${
              language === lang.code ? 'bg-primary text-white border-primary' : 'bg-white border-border hover:border-primary'
            }`}>{lang.native}</button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🌾</span>
          </div>
          <span className="text-xl font-bold text-foreground">{t('footer.company')}</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">🏭 Industry Login</h1>
        <p className="text-muted-foreground mb-6">Sign in to your industry account</p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input
              type="email" value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input
              type="password" value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">New industry?{' '}
            <button onClick={onRegister} className="text-primary font-medium hover:underline">Register as Industry</button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <button onClick={onBack} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
            ← Back to role selection
          </button>
        </div>
      </motion.div>
    </div>
  )
}
