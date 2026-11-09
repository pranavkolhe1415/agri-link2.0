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

export function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    {
      number: '01',
      title: t('howItWorks.steps.register.title'),
      description: t('howItWorks.steps.register.description'),
      icon: '👤',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '02',
      title: t('howItWorks.steps.list.title'),
      description: t('howItWorks.steps.list.description'),
      icon: '📝',
      color: 'from-green-500 to-green-600'
    },
    {
      number: '03',
      title: t('howItWorks.steps.connect.title'),
      description: t('howItWorks.steps.connect.description'),
      icon: '🤝',
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: '04',
      title: t('howItWorks.steps.deliver.title'),
      description: t('howItWorks.steps.deliver.description'),
      icon: '🚚',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('howItWorks.subtitle')}
          </p>
        </AnimatedSection>

        {/* Steps */}
        <motion.div 
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="relative text-center group"
              >
                {/* Step Number */}
                <div className="relative mx-auto mb-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto z-10 relative group-hover:scale-110 transition-transform duration-300`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-background">
                    <span className="text-xl">{step.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 text-primary/40 text-2xl z-20">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}