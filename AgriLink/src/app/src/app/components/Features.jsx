import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'motion/react'
import { useLanguage } from './contexts/LanguageContext'

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
      staggerChildren: 0.2
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

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: '🛒',
      title: t('features.items.directSales.title'),
      description: t('features.items.directSales.description'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '💰',
      title: t('features.items.fairPricing.title'),
      description: t('features.items.fairPricing.description'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '✨',
      title: t('features.items.qualityAssurance.title'),
      description: t('features.items.qualityAssurance.description'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🚚',
      title: t('features.items.logistics.title'),
      description: t('features.items.logistics.description'),
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="group relative"
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border h-full group-hover:-translate-y-2">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Benefits */}
        <AnimatedSection delay={600} className="mt-20">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Why Farmers Choose Us
              </h3>
              <p className="text-xl text-muted-foreground">
                Join thousands of farmers who have transformed their business with our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Increase Income</h4>
                <p className="text-muted-foreground">Average 40% increase in farmer income through direct sales</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Reach More Markets</h4>
                <p className="text-muted-foreground">Access to urban consumers and B2B customers nationwide</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Easy to Use</h4>
                <p className="text-muted-foreground">Simple mobile app with support in local language</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}