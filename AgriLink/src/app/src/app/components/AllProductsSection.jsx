import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'motion/react'
import { useLanguage } from './contexts/LanguageContext'
import { useApp } from './contexts/AppContext'
import { BuyNowModal } from './industry/BuyNowModal'
import { CartPage } from './industry/CartPage'
import { IndustryHistory } from './industry/IndustryHistory'
import { NotificationsPanel } from './shared/NotificationsPanel'
import { ProfileMenu } from './shared/ProfileMenu'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const CATEGORIES = [
  { id: 'vegetables', label: 'Vegetables', labelHi: 'सब्जियां', labelMr: 'भाज्या', icon: '🥬' },
  { id: 'fruits',     label: 'Fruits',     labelHi: 'फल',       labelMr: 'फळे',   icon: '🍎' },
  { id: 'grains',     label: 'Grains',     labelHi: 'अनाज',     labelMr: 'धान्य', icon: '🌾' },
  { id: 'dairy',      label: 'Dairy',      labelHi: 'डेयरी',    labelMr: 'डेअरी', icon: '🥛' },
  { id: 'spices',     label: 'Spices',     labelHi: 'मसाले',    labelMr: 'मसाले', icon: '🌶️' },
]

function getCategoryLabel(cat, language) {
  if (language === 'hi') return cat.labelHi
  if (language === 'mr') return cat.labelMr
  return cat.label
}

export function AllProductsSection({ user }) {
  const { t, language } = useLanguage()
  const { products, addToCart, cart, getUserNotifications, logout } = useApp()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [buyNowProduct, setBuyNowProduct] = useState(null)
  const [section, setSection] = useState('products')
  const [addedToCart, setAddedToCart] = useState({})
  const unread = getUserNotifications(user?.id || '').filter(n => !n.read).length
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => { window.scrollTo(0, 0) }, [section])

  if (section === 'cart') return <CartPage user={user} onBack={() => setSection('products')} />
  if (section === 'history') return <IndustryHistory user={user} onBack={() => setSection('products')} />
  if (section === 'notifications') return <NotificationsPanel user={user} onBack={() => setSection('products')} />

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    setAddedToCart(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAddedToCart(prev => ({ ...prev, [product.id]: false })), 1200)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Industry top bar */}
      {user && (
        <div className="bg-white border-b border-border px-4 py-3 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground">All Products</h1>
              <p className="text-xs text-muted-foreground">{user.companyName || user.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setSection('cart')}
                className="relative flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg hover:border-primary transition-colors text-sm font-medium text-foreground">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <ProfileMenu
                user={user}
                unread={unread}
                onNotifications={() => setSection('notifications')}
                onHistory={() => setSection('history')}
                onLogout={logout}
              />
            </div>
          </div>
        </div>
      )}

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-foreground mb-3">{t('products.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('products.subtitle')}</p>
          </div>

          {/* Category Filter — exactly once each, no duplicates */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full border-2 transition-all duration-200 font-medium text-sm ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:border-primary'
              }`}
            >
              All Products
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full border-2 transition-all duration-200 font-medium text-sm flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:border-primary'
                }`}
              >
                <span>{cat.icon}</span>
                {getCategoryLabel(cat, language)}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-foreground mb-2">No products in this category</h3>
              <p className="text-muted-foreground">Check back later or browse other categories</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group border border-border/50"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=60' }}
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full font-medium text-foreground capitalize">
                      {product.category}
                    </div>
                    {/* Rating — always visible */}
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
                      <span className="text-yellow-500 text-sm leading-none">★</span>
                      <span className="text-xs font-bold text-foreground leading-none">{product.rating}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-semibold text-foreground mb-1 leading-tight">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      By {product.farmerName} • {product.farmerLocation}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Listed: {product.date} &nbsp;|&nbsp; Avail: {product.quantity} {product.unit}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xl font-bold text-primary">
                        ₹{product.price}
                        <span className="text-xs font-normal text-muted-foreground ml-1">/{product.unit}</span>
                      </div>
                      <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.quantity > 0 ? t('marketplace.inStock') : t('marketplace.outOfStock')}
                      </div>
                    </div>

                    {product.quantity > 0 && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            addedToCart[product.id]
                              ? 'bg-green-500 text-white'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                          }`}
                        >
                          {addedToCart[product.id] ? '✓ Added' : t('marketplace.addToCart')}
                        </button>
                        <button
                          onClick={() => setBuyNowProduct(product)}
                          className="flex-1 border border-primary text-primary py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                        >
                          {t('marketplace.buyNow')}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {buyNowProduct && user && (
        <BuyNowModal
          product={buyNowProduct}
          user={user}
          onClose={() => setBuyNowProduct(null)}
        />
      )}
    </div>
  )
}
