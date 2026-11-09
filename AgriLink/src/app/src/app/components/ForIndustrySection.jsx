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

export function ForIndustrySection() {
  const { t } = useLanguage()

  const solutions = [
    {
      title: 'B2B Marketplace',
      description: 'Connect directly with verified farmers and agricultural suppliers',
      icon: '🏢',
      features: ['Bulk purchasing', 'Quality assurance', 'Transparent pricing', 'Contract farming']
    },
    {
      title: 'Supply Chain Management',
      description: 'End-to-end visibility and control over your agricultural supply chain',
      icon: '📈',
      features: ['Real-time tracking', 'Inventory management', 'Demand forecasting', 'Risk mitigation']
    },
    {
      title: 'Quality Control',
      description: 'Comprehensive quality monitoring and certification systems',
      icon: '🔍',
      features: ['Lab testing', 'Certification', 'Traceability', 'Compliance monitoring']
    },
    {
      title: 'Data Analytics',
      description: 'Advanced analytics and insights for better decision making',
      icon: '📊',
      features: ['Market intelligence', 'Price analytics', 'Trend analysis', 'Custom reports']
    }
  ]

  const industries = [
    {
      name: 'Food Processing',
      description: 'Raw materials for food manufacturing and processing companies',
      companies: ['Nestle', 'Unilever', 'ITC', 'Britannia'],
      volume: '10,000+ MT/month',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Retail Chains',
      description: 'Fresh produce supply for supermarkets and retail chains',
      companies: ['Big Bazaar', 'Reliance Fresh', 'DMart', 'Spencer\'s'],
      volume: '5,000+ MT/month',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Export Companies',
      description: 'Premium quality produce for international markets',
      companies: ['Export Houses', 'Trading Companies', 'Commodity Traders'],
      volume: '2,000+ MT/month',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ]

  const benefits = [
    {
      title: 'Cost Reduction',
      value: '30%',
      description: 'Lower procurement costs through direct farmer connections'
    },
    {
      title: 'Quality Improvement',
      value: '95%',
      description: 'Consistent quality with certified suppliers'
    },
    {
      title: 'Supply Reliability',
      value: '99%',
      description: 'On-time delivery with backup suppliers'
    },
    {
      title: 'Transparency',
      value: '100%',
      description: 'Complete visibility into supply chain'
    }
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection direction="left" className="lg:w-1/2">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Enterprise Solutions for Agricultural Sourcing
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Streamline your agricultural procurement with our B2B platform designed 
                for food processors, retailers, and exporters who demand quality and reliability.
              </p>
              <div className="flex gap-4 mb-8">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                  Request Demo
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                  View Pricing
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Enterprise Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50,000+</div>
                  <div className="text-sm text-muted-foreground">MT Monthly Volume</div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" className="lg:w-1/2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Industrial Agriculture"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Enterprise Solutions</h2>
            <p className="text-xl text-muted-foreground">Comprehensive tools for modern agricultural procurement</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <AnimatedSection key={solution.title} delay={index * 100}>
                <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {solution.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground mb-4">{solution.description}</p>
                  
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground">Trusted by leading companies across sectors</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <AnimatedSection 
                key={industry.name} 
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
              >
                <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <ImageWithFallback
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{industry.name}</h3>
                    <p className="text-muted-foreground mb-4">{industry.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground mb-2">Trusted by:</div>
                      <div className="flex flex-wrap gap-2">
                        {industry.companies.map((company, companyIndex) => (
                          <span key={companyIndex} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="text-sm text-muted-foreground">Monthly Volume</div>
                      <div className="text-lg font-semibold text-primary">{industry.volume}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Proven Results</h2>
            <p className="text-xl text-muted-foreground">See the impact on your business</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 100}>
                <div className="text-center bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-bold text-primary mb-2">{benefit.value}</div>
                  <div className="text-lg font-semibold text-foreground mb-3">{benefit.title}</div>
                  <div className="text-muted-foreground text-sm">{benefit.description}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection direction="left" className="lg:w-1/2">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Company Logo"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">FoodTech Industries</h4>
                    <p className="text-sm text-muted-foreground">Leading Food Processor</p>
                  </div>
                </div>
                
                <blockquote className="text-lg text-muted-foreground italic mb-6">
                  "AgriConnect transformed our procurement process. We reduced costs by 35% 
                  while improving quality consistency across all our products."
                </blockquote>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">35%</div>
                    <div className="text-xs text-muted-foreground">Cost Reduction</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">50%</div>
                    <div className="text-xs text-muted-foreground">Time Saved</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">99%</div>
                    <div className="text-xs text-muted-foreground">On-time Delivery</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" className="lg:w-1/2">
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Success Story: Food Processing Giant
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Challenge:</strong> A major food processing company was struggling 
                  with inconsistent supply, high procurement costs, and lack of transparency 
                  in their agricultural sourcing.
                </p>
                <p>
                  <strong>Solution:</strong> Implemented our B2B marketplace with integrated 
                  quality control and supply chain management tools.
                </p>
                <p>
                  <strong>Results:</strong> Within 6 months, they achieved significant cost 
                  savings, improved quality consistency, and established long-term relationships 
                  with verified farmers.
                </p>
              </div>
              
              <button className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                Read Full Case Study
              </button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Optimize Your Agricultural Sourcing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of enterprises that trust us for their agricultural procurement needs. 
              Get started with a personalized demo today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex-1">
                Schedule Demo
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors duration-200 flex-1">
                Get Quote
              </button>
            </div>
            
            <p className="text-sm text-white/70 mt-4">
              Trusted by 500+ enterprises • Custom solutions available
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}