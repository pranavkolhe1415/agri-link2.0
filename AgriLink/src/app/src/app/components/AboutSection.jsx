import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'motion/react'
import { useLanguage } from './contexts/LanguageContext'
import { ImageWithFallback } from './figma/ImageWithFallback'

const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

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

const timelineItemLeft = {
  hidden: { opacity: 0, x: -80, scale: 0.8 },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      type: "spring",
      stiffness: 100
    }
  }
}

const timelineItemRight = {
  hidden: { opacity: 0, x: 80, scale: 0.8 },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      type: "spring",
      stiffness: 100
    }
  }
}

const timelineLine = {
  hidden: { height: 0 },
  visible: { 
    height: '100%',
    transition: { 
      duration: 2,
      ease: "easeInOut"
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

function TimelineItem({ item, index, isLeft }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.3 })

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
      variants={isLeft ? timelineItemLeft : timelineItemRight}
      className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-12`}
    >
      <div className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <motion.div 
          className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className={`flex items-center ${isLeft ? 'justify-end' : 'justify-start'} mb-3`}>
            <span className="text-2xl mr-3">{item.icon}</span>
            <h3 className="text-xl font-bold text-foreground">{item.year}</h3>
          </div>
          <h4 className="text-lg font-semibold text-primary mb-2">{item.title}</h4>
          <p className="text-muted-foreground">{item.description}</p>
        </motion.div>
      </div>
      
      <div className="w-2/12 flex justify-center">
        <motion.div 
          className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"
          whileHover={{ scale: 1.5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
      
      <div className="w-5/12" />
    </motion.div>
  )
}

export function AboutSection() {
  const { t } = useLanguage()
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, threshold: 0.1 })
  const timelineControls = useAnimation()

  useEffect(() => {
    if (timelineInView) {
      timelineControls.start("visible")
    }
  }, [timelineInView, timelineControls])

  const journeyData = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'Started with a vision to connect farmers directly with consumers, eliminating middlemen and ensuring fair prices.',
      icon: '🌱'
    },
    {
      year: '2019',
      title: 'First 1000 Farmers',
      description: 'Reached our first milestone of onboarding 1000 farmers across 5 states, focusing on organic and sustainable farming.',
      icon: '👨‍🌾'
    },
    {
      year: '2020',
      title: 'Digital Revolution',
      description: 'Launched our mobile app and digital platform, making it easier for farmers to list products and manage their sales.',
      icon: '📱'
    },
    {
      year: '2021',
      title: 'Quality Certification',
      description: 'Introduced quality certification program ensuring all products meet international standards for food safety.',
      icon: '🏆'
    },
    {
      year: '2022',
      title: 'Logistics Network',
      description: 'Established our own logistics network with cold storage facilities to maintain freshness from farm to table.',
      icon: '🚛'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Integrated AI-powered crop advisory and price prediction tools to help farmers make informed decisions.',
      icon: '🤖'
    },
    {
      year: '2024',
      title: 'International Expansion',
      description: 'Expanded to international markets, helping Indian farmers export their quality produce globally.',
      icon: '🌍'
    },
    {
      year: '2025',
      title: 'Sustainable Future',
      description: 'Leading the way in sustainable agriculture with 50,000+ farmers and 1M+ satisfied customers worldwide.',
      icon: '🚀'
    }
  ]

  const stats = [
    { number: '50,000+', label: 'Active Farmers', icon: '👨‍🌾' },
    { number: '1M+', label: 'Happy Customers', icon: '😊' },
    { number: '500+', label: 'Cities Served', icon: '🏙️' },
    { number: '99%', label: 'Customer Satisfaction', icon: '⭐' }
  ]

  const values = [
    {
      title: 'Transparency',
      description: 'Complete transparency in pricing, quality, and farming practices',
      icon: '🔍'
    },
    {
      title: 'Sustainability',
      description: 'Promoting eco-friendly and sustainable farming methods',
      icon: '🌱'
    },
    {
      title: 'Quality',
      description: 'Ensuring the highest quality produce reaches consumers',
      icon: '✨'
    },
    {
      title: 'Innovation',
      description: 'Leveraging technology to solve agricultural challenges',
      icon: '💡'
    }
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection direction="left" className="lg:w-1/2">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Transforming Agriculture Through Technology
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're on a mission to revolutionize the agricultural ecosystem by connecting farmers 
                directly with consumers, ensuring fair prices and fresh produce for everyone.
              </p>
              <div className="flex gap-4">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                  Learn More
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                  Contact Us
                </button>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" className="lg:w-1/2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern Agriculture"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-muted-foreground">Making a difference in the agricultural community</p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">From a small startup to revolutionizing agriculture</p>
          </AnimatedSection>

          <div ref={timelineRef} className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-border h-full">
              <motion.div
                initial="hidden"
                animate={timelineControls}
                variants={timelineLine}
                className="w-full bg-gradient-to-b from-primary to-primary/60"
              />
            </div>

            {/* Timeline Items */}
            {journeyData.map((item, index) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection
                key={value.title}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="text-center"
              >
                <motion.div 
                  className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-muted-foreground">The visionaries behind our agricultural revolution</p>
          </AnimatedSection>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection direction="left" className="lg:w-1/2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Leadership Team"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </AnimatedSection>
            
            <AnimatedSection direction="right" className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Passionate About Sustainable Agriculture
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our leadership team combines decades of experience in agriculture, technology, 
                and business to create innovative solutions that benefit farmers and consumers alike.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">RS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Rajesh Sharma</h4>
                    <p className="text-muted-foreground">CEO & Co-founder</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">PK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Priya Kumar</h4>
                    <p className="text-muted-foreground">CTO & Co-founder</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-primary-foreground">
              <h2 className="text-3xl font-bold mb-4">Ready to Join Our Mission?</h2>
              <p className="text-xl mb-8 opacity-90">
                Whether you're a farmer looking to reach more customers or a consumer wanting fresh produce, 
                we're here to help you connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                  Join as Farmer
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors duration-200">
                  Start Shopping
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}