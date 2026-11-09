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

export function ForFarmersSection() {
  const { t } = useLanguage()

  const benefits = [
    {
      title: 'Direct Market Access',
      description: 'Sell directly to consumers and businesses without middlemen',
      icon: '🎯',
      stats: '40% higher prices'
    },
    {
      title: 'Digital Tools',
      description: 'Modern farming tools and analytics to optimize your production',
      icon: '📱',
      stats: '30% productivity boost'
    },
    {
      title: 'Quality Certification',
      description: 'Get your produce certified for premium market access',
      icon: '✅',
      stats: '25% price premium'
    },
    {
      title: 'Logistics Support',
      description: 'End-to-end delivery and cold storage facilities',
      icon: '🚛',
      stats: '95% on-time delivery'
    }
  ]

  const successStories = [
    {
      name: 'Rajesh Kumar',
      location: 'Maharashtra',
      crop: 'Organic Tomatoes',
      improvement: '60% income increase',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      story: 'Switched to organic farming and found premium buyers through the platform'
    },
    {
      name: 'Priya Sharma',
      location: 'Karnataka',
      crop: 'Exotic Fruits',
      improvement: '80% profit growth',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c589?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      story: 'Expanded from local to national markets with direct customer relationships'
    },
    {
      name: 'Suresh Patel',
      location: 'Punjab',
      crop: 'Basmati Rice',
      improvement: '45% better margins',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      story: 'Eliminated middlemen and connected directly with rice exporters'
    }
  ]

  const services = [
    {
      title: 'Crop Advisory',
      description: 'Expert guidance on crop selection, planting, and harvesting',
      features: ['Weather forecasts', 'Market prices', 'Pest management', 'Soil analysis']
    },
    {
      title: 'Financial Services',
      description: 'Access to credit, insurance, and investment opportunities',
      features: ['Crop loans', 'Insurance coverage', 'Equipment financing', 'Investment plans']
    },
    {
      title: 'Market Intelligence',
      description: 'Real-time market data and price trends',
      features: ['Price alerts', 'Demand forecasting', 'Competition analysis', 'Export opportunities']
    }
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection direction="left" className="lg:w-1/2">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Empower Your Farm with Technology
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of farmers who have transformed their agricultural business 
                with our comprehensive platform designed specifically for modern farming.
              </p>
              <div className="flex gap-4 mb-8">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                  Start Selling
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                  Watch Demo
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10,000+</div>
                  <div className="text-sm text-muted-foreground">Active Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">₹2Cr+</div>
                  <div className="text-sm text-muted-foreground">Monthly Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" className="lg:w-1/2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Happy Farmer"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Farmers Choose Us</h2>
            <p className="text-xl text-muted-foreground">Transform your farming business with our proven solutions</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 100}>
                <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-4">{benefit.description}</p>
                  <div className="text-primary font-semibold">{benefit.stats}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">Real farmers, real results</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <AnimatedSection 
                key={story.name} 
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
              >
                <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">{story.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-primary font-medium mb-1">{story.crop}</div>
                    <div className="text-lg font-bold text-green-600">{story.improvement}</div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm">{story.story}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Farm Services</h2>
            <p className="text-xl text-muted-foreground">Everything you need to grow your farming business</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 200}>
                <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <h3 className="text-xl font-semibold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="mt-6 w-full bg-primary/10 text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join our community of successful farmers and start growing your business today. 
              It's free to get started and you'll see results within the first month.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex-1">
                Get Started Free
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors duration-200 flex-1">
                Schedule Demo
              </button>
            </div>
            
            <p className="text-sm text-primary-foreground/70 mt-4">
              No credit card required • Free support • Cancel anytime
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}