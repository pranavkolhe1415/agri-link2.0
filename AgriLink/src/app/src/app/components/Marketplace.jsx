import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'motion/react'
import { useLanguage } from './contexts/LanguageContext'
import { ImageWithFallback } from './figma/ImageWithFallback'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  )
}

export function Marketplace() {
  const { t } = useLanguage()

  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      price: 40,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1546470427-227e1ba3e24f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      farmer: 'Rajesh Kumar',
      location: 'Maharashtra',
      rating: 4.8,
      category: 'vegetables'
    },
    {
      id: 2,
      name: 'Organic Bananas',
      price: 60,
      unit: 'dozen',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      farmer: 'Priya Sharma',
      location: 'Karnataka',
      rating: 4.9,
      category: 'fruits'
    },
    {
      id: 3,
      name: 'Basmati Rice',
      price: 120,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      farmer: 'Suresh Patel',
      location: 'Punjab',
      rating: 4.7,
      category: 'grains'
    },
    {
      id: 4,
      name: 'Fresh Milk',
      price: 55,
      unit: 'liter',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      farmer: 'Lakshmi Dairy',
      location: 'Gujarat',
      rating: 4.6,
      category: 'dairy'
    },
    {
      id: 5,
      name: 'Turmeric Powder',
      price: 180,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      farmer: 'Arjun Singh',
      location: 'Tamil Nadu',
      rating: 4.8,
      category: 'spices'
    },
    {
      id: 6,
      name: 'Fresh Spinach',
      price: 25,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      farmer: 'Meera Devi',
      location: 'Haryana',
      rating: 4.5,
      category: 'vegetables'
    }
  ]

  const categories = [
    { name: t('marketplace.categories.vegetables'), icon: '🥬', count: 120 },
    { name: t('marketplace.categories.fruits'), icon: '🍎', count: 85 },
    { name: t('marketplace.categories.grains'), icon: '🌾', count: 95 },
    { name: t('marketplace.categories.dairy'), icon: '🥛', count: 45 },
    { name: t('marketplace.categories.organic'), icon: '🌱', count: 67 },
    { name: t('marketplace.categories.spices'), icon: '🌶️', count: 52 }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('marketplace.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('marketplace.subtitle')}
          </p>
        </AnimatedSection>

        {/* Categories */}
        <AnimatedSection delay={200} className="mb-16">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={fadeInUp}
                className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} items</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Featured Products */}
        <AnimatedSection delay={400}>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-48">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-medium">
                    ⭐ {product.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    by {product.farmer} • {product.location}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-primary">
                      ₹{product.price}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        /{product.unit}
                      </span>
                    </div>
                    <div className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {t('marketplace.inStock')}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                      {t('marketplace.addToCart')}
                    </button>
                    <button className="flex-1 border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                      {t('marketplace.buyNow')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* View All Products Button */}
        <AnimatedSection delay={600} className="text-center mt-12">
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl">
            {t('marketplace.viewAll')}
          </button>
        </AnimatedSection>
      </div>
    </section>
  )
}