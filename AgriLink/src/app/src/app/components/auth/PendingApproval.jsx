import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'

export function PendingApproval({ type, onBack }) {
  const { language, changeLanguage, availableLanguages } = useLanguage()

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center"
      >
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⏳</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Registration Submitted!</h1>
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">✓</span>
            <span className="text-sm text-foreground">OTP verified successfully</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">⏳</span>
            <span className="text-sm text-foreground">Account pending admin approval</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">○</span>
            <span className="text-sm text-muted-foreground">Login after approval</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6">
          Your {type === 'farmer' ? 'farmer' : 'industry'} registration has been submitted.
          An admin will review your details and approve or reject your account.
          You will be notified once a decision is made.
        </p>

        <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground mb-6">
          Admin login: <strong>admin@agriconnect.in</strong> / <strong>admin123</strong>
        </div>

        <button onClick={onBack}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
          Back to Login
        </button>
      </motion.div>
    </div>
  )
}
