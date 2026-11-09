import { useLanguage } from './contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.farmers'), href: '#' },
    { name: t('nav.industry'), href: '#' },
    { name: t('nav.about'), href: '#' }
  ]

  const services = [
    { name: 'Direct Sales', href: '#' },
    { name: 'Quality Assurance', href: '#' },
    { name: 'Logistics', href: '#' },
    { name: 'Price Discovery', href: '#' },
    { name: 'Market Analytics', href: '#' }
  ]

  const support = [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Support', href: '#' },
    { name: 'Farmer Training', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Community Forum', href: '#' }
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <span className="text-xl font-bold text-foreground">{t('footer.company')}</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">{t('footer.description')}</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-primary">📞</span>
                <span className="text-muted-foreground">+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-primary">📧</span>
                <span className="text-muted-foreground">support@agriconnect.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-primary">📍</span>
                <span className="text-muted-foreground">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-200">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a href={service.href} className="text-muted-foreground hover:text-primary transition-colors duration-200">{service.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors duration-200">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-6">
              <span className="text-muted-foreground">{t('footer.followUs')}:</span>
              <div className="flex space-x-4">
                {['📘', '🐦', '📸', '🔗'].map((icon, i) => (
                  <a key={i} href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                    <span className="text-lg">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input type="email" placeholder="Enter your email"
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© 2025 {t('footer.company')}. {t('footer.rights')}.</p>
            <div className="flex space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <a key={l} href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
