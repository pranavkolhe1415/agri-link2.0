import { useState, useEffect } from 'react'
import { LanguageProvider } from "./components/contexts/LanguageContext"
import { ThemeProvider } from "./components/contexts/ThemeContext"
import { AppProvider, useApp } from "./components/contexts/AppContext"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Features } from "./components/Features"
import { HowItWorks } from "./components/HowItWorks"
import { Footer } from "./components/Footer"
import { ForFarmersSection } from "./components/ForFarmersSection"
import { ForIndustrySection } from "./components/ForIndustrySection"
import { AboutSection } from "./components/AboutSection"
import { AllProductsSection } from "./components/AllProductsSection"
import { RoleSelect } from "./components/auth/RoleSelect"
import { FarmerLogin } from "./components/auth/FarmerLogin"
import { IndustryLogin } from "./components/auth/IndustryLogin"
import { FarmerRegister } from "./components/auth/FarmerRegister"
import { IndustryRegister } from "./components/auth/IndustryRegister"
import { OTPVerification } from "./components/auth/OTPVerification"
import { PendingApproval } from "./components/auth/PendingApproval"
import { AdminLogin } from "./components/auth/AdminLogin"
import { FarmerDashboard } from "./components/farmer/FarmerDashboard"
import { AdminDashboard } from "./components/admin/AdminDashboard"
import { useLanguage } from "./components/contexts/LanguageContext"

type AuthPage = 'role-select' | 'farmer-login' | 'industry-login'
  | 'farmer-register' | 'industry-register' | 'otp' | 'pending'
  | 'admin-login'

interface OTPData { userId: string; email: string; mobile: string; type: string }

// Full-screen auth pages — no chrome
const AUTH_PAGES: AuthPage[] = [
  'role-select', 'farmer-login', 'industry-login',
  'farmer-register', 'industry-register', 'otp', 'pending', 'admin-login',
]

function IndustryLayout({ user }: { user: any }) {
  const { t, language, changeLanguage, availableLanguages } = useLanguage()
  const { logout } = useApp()
  const [section, setSection] = useState('products')

  useEffect(() => { window.scrollTo(0, 0) }, [section])

  const navItems = [
    { id: 'industry', label: t('nav.industry') },
    { id: 'products', label: t('nav.products') },
    { id: 'about', label: t('nav.about') },
  ]

  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const currentLang = availableLanguages.find(l => l.code === language)

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <span className="text-xl font-bold text-foreground">{t('footer.company')}</span>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(item => (
                <button key={item.id} onClick={() => setSection(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    section === item.id ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}>{item.label}</button>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <button onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:border-primary transition-colors">
                  <span className="text-sm font-medium text-black whitespace-nowrap">{currentLang?.native}</span>
                  <svg className={`w-3.5 h-3.5 text-black transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {langOpen && (
                  <div className="absolute top-full mt-1.5 right-0 bg-white border border-border rounded-lg shadow-lg py-1 z-50" style={{ minWidth: '110px' }}>
                    {availableLanguages.map(lang => (
                      <button key={lang.code} onClick={() => { changeLanguage(lang.code); setLangOpen(false) }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 text-black ${language === lang.code ? 'bg-primary/5 font-medium' : ''}`}>
                        {lang.native}
                      </button>
                    ))}
                  </div>
                )}{langOpen && <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />}
              </div>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-primary/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden border-t border-border py-4">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setSection(item.id); setMenuOpen(false) }}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${
                    section === item.id ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-primary/10'
                  }`}>{item.label}</button>
              ))}
              <div className="border-t border-border pt-3 mt-2">
                <div className="flex gap-2">{availableLanguages.map(lang => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`px-3 py-2 rounded-lg text-sm border text-black ${language === lang.code ? 'bg-primary text-white border-primary' : 'bg-white border-border'}`}>
                    {lang.native}
                  </button>
                ))}</div>
              </div>
            </div>
          )}
        </div>
      </header>

      {section === 'industry' && <><ForIndustrySection /><Footer /></>}
      {section === 'about' && <><AboutSection /><Footer /></>}
      {section === 'products' && <AllProductsSection user={user} />}
    </div>
  )
}

function FarmerLayout({ user }: { user: any }) {
  const { t, language, changeLanguage, availableLanguages } = useLanguage()
  const { logout } = useApp()
  const [section, setSection] = useState('dashboard')
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const currentLang = availableLanguages.find(l => l.code === language)

  useEffect(() => { window.scrollTo(0, 0) }, [section])

  if (section === 'dashboard') return <FarmerDashboard user={user} />

  const navItems = [
    { id: 'dashboard', label: t('nav.farmers') },
    { id: 'about', label: t('nav.about') },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <span className="text-xl font-bold text-foreground">{t('footer.company')}</span>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(item => (
                <button key={item.id} onClick={() => setSection(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    section === item.id ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}>{item.label}</button>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <button onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:border-primary transition-colors">
                  <span className="text-sm font-medium text-black whitespace-nowrap">{currentLang?.native}</span>
                  <svg className={`w-3.5 h-3.5 text-black transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {langOpen && (
                  <div className="absolute top-full mt-1.5 right-0 bg-white border border-border rounded-lg shadow-lg py-1 z-50" style={{ minWidth: '110px' }}>
                    {availableLanguages.map(lang => (
                      <button key={lang.code} onClick={() => { changeLanguage(lang.code); setLangOpen(false) }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 text-black ${language === lang.code ? 'bg-primary/5 font-medium' : ''}`}>
                        {lang.native}
                      </button>
                    ))}
                  </div>
                )}{langOpen && <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />}
              </div>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-primary/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden border-t border-border py-4">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setSection(item.id); setMenuOpen(false) }}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${
                    section === item.id ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-primary/10'
                  }`}>{item.label}</button>
              ))}
              <div className="border-t border-border pt-3 mt-2">
                <div className="flex gap-2">{availableLanguages.map(lang => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`px-3 py-2 rounded-lg text-sm border text-black ${language === lang.code ? 'bg-primary text-white border-primary' : 'bg-white border-border'}`}>
                    {lang.native}
                  </button>
                ))}</div>
              </div>
            </div>
          )}
        </div>
      </header>
      {section === 'about' ? <><AboutSection /><Footer /></> : <ForFarmersSection />}
    </div>
  )
}

function AppContent() {
  const { currentUser, logout } = useApp()
  const { t } = useLanguage()
  const [page, setPage] = useState<AuthPage | 'home' | 'farmer-app' | 'industry-app' | 'admin-app'>('home')
  const [section, setSection] = useState('home')
  const [otpData, setOtpData] = useState<OTPData | null>(null)
  const [pendingType, setPendingType] = useState('')

  useEffect(() => { window.scrollTo(0, 0) }, [page, section])

  useEffect(() => {
    if (!currentUser) {
      setPage(current => ['admin-app','farmer-app','industry-app'].includes(current) ? 'home' : current)
      return
    }
    if (currentUser.type === 'admin') setPage('admin-app')
    else if (currentUser.type === 'farmer') setPage('farmer-app')
    else if (currentUser.type === 'industry') setPage('industry-app')
  }, [currentUser])

  // Render full-screen auth pages
  if (AUTH_PAGES.includes(page as AuthPage)) {
    switch (page) {
      case 'role-select':
        return <RoleSelect onSelect={(role: string) => {
          if (role === 'farmer') setPage('farmer-login')
          else if (role === 'industry') setPage('industry-login')
          else setPage('admin-login')
        }} />
      case 'farmer-login':
        return <FarmerLogin
          onSuccess={() => setPage('farmer-app')}
          onRegister={() => setPage('farmer-register')}
          onBack={() => setPage('role-select')}
        />
      case 'industry-login':
        return <IndustryLogin
          onSuccess={() => setPage('industry-app')}
          onRegister={() => setPage('industry-register')}
          onBack={() => setPage('role-select')}
        />
      case 'farmer-register':
        return <FarmerRegister
          onOTP={(userId: string, email: string, mobile: string) => {
            setOtpData({ userId, email, mobile, type: 'farmer' })
            setPage('otp')
          }}
          onBack={() => setPage('farmer-login')}
        />
      case 'industry-register':
        return <IndustryRegister
          onOTP={(userId: string, email: string, mobile: string) => {
            setOtpData({ userId, email, mobile, type: 'industry' })
            setPage('otp')
          }}
          onBack={() => setPage('industry-login')}
        />
      case 'otp':
        return <OTPVerification
          userId={otpData?.userId || ''}
          email={otpData?.email || ''}
          mobile={otpData?.mobile || ''}
          onSuccess={() => { setPendingType(otpData?.type || ''); setPage('pending') }}
          onBack={() => setPage(otpData?.type === 'farmer' ? 'farmer-register' : 'industry-register')}
        />
      case 'pending':
        return <PendingApproval
          type={pendingType}
          onBack={() => setPage(pendingType === 'farmer' ? 'farmer-login' : 'industry-login')}
        />
      case 'admin-login':
        return <AdminLogin
          onSuccess={() => setPage('admin-app')}
          onBack={() => setPage('role-select')}
        />
    }
  }

  // Logged-in role apps
  if (page === 'admin-app') return <AdminDashboard user={currentUser} />
  if (page === 'farmer-app') return <FarmerLayout user={currentUser} />
  if (page === 'industry-app') return <IndustryLayout user={currentUser} />

  // Public home page
  return (
    <div className="min-h-screen bg-background">
      <Header
        currentSection={section}
        onSectionChange={(s: string) => setSection(s)}
        role={null}
        onGetStarted={() => setPage('role-select')}
        onLogout={logout}
      />
      <Hero onGetStarted={() => setPage('role-select')} />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
