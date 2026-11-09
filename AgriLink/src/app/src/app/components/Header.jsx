import { useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from './contexts/LanguageContext'

export function Header({ currentSection, onSectionChange, role, onGetStarted, onLogout }) {
  const { t, language, changeLanguage, availableLanguages } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const getNavItems = () => {
    if (role === 'farmer') return [
      { id: 'farmers', label: t('nav.farmers') },
      { id: 'about', label: t('nav.about') }
    ]
    if (role === 'industry') return [
      { id: 'industry', label: t('nav.industry') },
      { id: 'products', label: t('nav.products') },
      { id: 'about', label: t('nav.about') }
    ]
    return []
  }

  const navItems = getNavItems()
  const currentLanguage = availableLanguages.find(lang => lang.code === language)

  const LanguageDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:border-primary transition-colors duration-200"
        style={{ minWidth: 'auto' }}
      >
        <span className="text-sm font-medium text-black whitespace-nowrap">
          {currentLanguage?.native}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-black transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isLanguageOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-1.5 right-0 bg-white border border-border rounded-lg shadow-lg py-1 z-50"
          style={{ minWidth: '110px' }}
        >
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { changeLanguage(lang.code); setIsLanguageOpen(false) }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition-colors duration-200 text-black ${
                language === lang.code ? 'bg-primary/5 font-medium' : ''
              }`}
            >
              {lang.native}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3 cursor-pointer flex-shrink-0"
            onClick={() => onSectionChange?.('home')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌾</span>
            </div>
            <span className="text-xl font-bold text-foreground">{t('footer.company')}</span>
          </motion.div>

          {/* Desktop Navigation */}
          {navItems.length > 0 && (
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => onSectionChange?.(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          )}

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageDropdown />
            {!role && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onGetStarted}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
              >
                {t('hero.cta')}
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
          >
            <svg className={`w-6 h-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-border mt-4 pt-4 pb-4"
          >
            {navItems.length > 0 && (
              <nav className="flex flex-col space-y-2 mb-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onSectionChange?.(item.id); setIsMenuOpen(false) }}
                    className={`text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      currentSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}

            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Language</p>
              <div className="flex gap-2 flex-wrap">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 text-black border ${
                      language === lang.code
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white border-border hover:border-primary'
                    }`}
                  >
                    {lang.native}
                  </button>
                ))}
              </div>
            </div>

            {!role && (
              <div className="mt-4">
                <button
                  onClick={() => { onGetStarted?.(); setIsMenuOpen(false) }}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
                >
                  {t('hero.cta')}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {isLanguageOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsLanguageOpen(false)} />
      )}
    </motion.header>
  )
}
