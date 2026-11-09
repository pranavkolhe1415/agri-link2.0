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

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
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

function AnimatedSection({ children, direction = "up", className = "", delay = 0 }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const variants = direction === "left" ? fadeInLeft : direction === "right" ? fadeInRight : fadeInUp

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  )
}

export function Hero({ onGetStarted }) {
  const { t } = useLanguage()

  const stats = [
    { number: '10,000+', label: t('hero.stats.farmers') },
    { number: '50,000+', label: t('hero.stats.products') },
    { number: '1M+', label: t('hero.stats.sales') }
  ]

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <AnimatedSection direction="left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t('hero.title')}
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={200}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
                >
                  {t('hero.cta')}
                </button>
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-medium text-lg">
                  {t('hero.learnMore')}
                </button>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection direction="left" delay={600}>
              <motion.div 
                className="flex flex-col sm:flex-row gap-8 pt-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="text-center sm:text-left"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Hero Image */}
          <AnimatedSection direction="right" className="lg:w-1/2">
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern Agriculture"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute top-4 -left-4 bg-white rounded-lg p-4 shadow-lg z-20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Fresh Organic</div>
                    <div className="text-sm text-muted-foreground">Farm to Table</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg z-20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Fast Delivery</div>
                    <div className="text-sm text-muted-foreground">Same Day</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>

        {/* Trust Indicators */}
        <AnimatedSection delay={800} className="mt-20">
          <div className="text-center mb-8">
            <p className="text-muted-foreground">Trusted by leading organizations</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              'Ministry of Agriculture',
              'Farmer Producer Organizations',
              'Agricultural Universities',
              'Food Processing Industry',
              'Retail Chains'
            ].map((org, index) => (
              <motion.div
                key={org}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="bg-white/50 px-6 py-3 rounded-lg backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-foreground">{org}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}