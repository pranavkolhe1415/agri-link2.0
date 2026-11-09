import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'

export function RoleSelect({ onSelect }) {
  const { t, language, changeLanguage, availableLanguages } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex flex-col items-center justify-center px-4">
      {/* Language selector */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {availableLanguages.map(lang => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors duration-200 text-black ${
              language === lang.code
                ? 'bg-primary text-white border-primary'
                : 'bg-white border-border hover:border-primary'
            }`}
          >
            {lang.native}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3 mb-10"
      >
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">🌾</span>
        </div>
        <span className="text-2xl font-bold text-foreground">{t('footer.company')}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-foreground mb-3">{t('login.title')}</h1>
        <p className="text-lg text-muted-foreground">{t('login.subtitle')}</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => onSelect('farmer')}
          className="flex-1 bg-white border-2 border-border rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300 group"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🌱</div>
          <h2 className="text-xl font-bold text-foreground mb-2">{t('login.farmer')}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t('login.farmerDesc')}</p>
          <div className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium">
            {t('login.farmer')}
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => onSelect('industry')}
          className="flex-1 bg-white border-2 border-border rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300 group"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏭</div>
          <h2 className="text-xl font-bold text-foreground mb-2">{t('login.industry')}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t('login.industryDesc')}</p>
          <div className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium">
            {t('login.industry')}
          </div>
        </motion.button>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={() => onSelect('admin')}
        className="mt-6 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 underline"
      >
        Admin Login
      </motion.button>
    </div>
  )
}
