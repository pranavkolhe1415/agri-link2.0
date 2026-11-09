import { useState, useEffect, useRef } from 'react'
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
      staggerChildren: 0.1
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

export function MarketplaceSection() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('fresh-produce')

  const marketplaceSections = [
    {
      id: 'fresh-produce',
      title: 'Fresh Produce',
      titleHi: 'ताजी उपज',
      titleMr: 'ताजी उत्पादने',
      description: 'Farm-fresh vegetables and fruits directly from farmers',
      descriptionHi: 'शेतकऱ्यांकडून थेट ताजी भाज्या आणि फळे',
      descriptionMr: 'शेतकऱ्यांकडून थेट ताजी भाज्या आणि फळे',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      products: [
        { name: 'Organic Tomatoes', price: 45, unit: 'kg', image: 'https://images.unsplash.com/photo-1546470427-227e1ba3e24f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Fresh Carrots', price: 35, unit: 'kg', image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Green Beans', price: 50, unit: 'kg', image: 'https://images.unsplash.com/photo-1618518352755-95ee35a37487?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Fresh Apples', price: 120, unit: 'kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 'grains-cereals',
      title: 'Grains & Cereals',
      titleHi: 'अनाज और दलहन',
      titleMr: 'धान्य आणि दाळी',
      description: 'Premium quality grains and cereals for your daily needs',
      descriptionHi: 'आपकी दैनिक आवश्यकताओं के लिए प्रीमियम गुणवत्ता अनाज और दलहन',
      descriptionMr: 'तुमच्या दैनंदिन गरजांसाठी उत्कृष्ट दर्जाचे धान्य आणि दाळी',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      products: [
        { name: 'Basmati Rice', price: 120, unit: 'kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Wheat Flour', price: 45, unit: 'kg', image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Yellow Lentils', price: 85, unit: 'kg', image: 'https://images.unsplash.com/photo-1585775018811-b7d0fb2e3f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Quinoa', price: 180, unit: 'kg', image: 'https://images.unsplash.com/photo-1591978329841-e5b0e3e5d2d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 'dairy-products',
      title: 'Dairy Products',
      titleHi: 'डेयरी उत्पाद',
      titleMr: 'दूध उत्पादने',
      description: 'Fresh dairy products from local farms',
      descriptionHi: 'स्थानीय फार्मों से ताज़ा डेयरी उत्पाद',
      descriptionMr: 'स्थानिक शेतातून ताजी दूध उत्पादने',
      image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      products: [
        { name: 'Fresh Milk', price: 55, unit: 'liter', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Organic Yogurt', price: 45, unit: 'kg', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Farm Butter', price: 280, unit: 'kg', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Cottage Cheese', price: 180, unit: 'kg', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 'spices-herbs',
      title: 'Spices & Herbs',
      titleHi: 'मसाले और जड़ी-बूटी',
      titleMr: 'मसाले आणि औषधी वनस्पती',
      description: 'Aromatic spices and fresh herbs for authentic flavors',
      descriptionHi: 'प्रामाणिक स्वाद के लिए सुगंधित मसाले और ताज़ी जड़ी-बूटी',
      descriptionMr: 'अस्सल चवीसाठी सुगंधित मसाले आणि ताजी औषधी वनस्पती',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      products: [
        { name: 'Turmeric Powder', price: 180, unit: 'kg', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Red Chili Powder', price: 220, unit: 'kg', image: 'https://images.unsplash.com/photo-1583327904972-d75322565026?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Fresh Basil', price: 80, unit: 'bunch', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Cardamom', price: 1200, unit: 'kg', image: 'https://images.unsplash.com/photo-1596978842003-ea1169ded7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 'farming-equipment',
      title: 'Farming Equipment',
      titleHi: 'कृषि उपकरण',
      titleMr: 'शेती उपकरणे',
      description: 'Modern tools and equipment for efficient farming',
      descriptionHi: 'कुशल खेती के लिए आधुनिक उपकरण और यंत्र',
      descriptionMr: 'कार्यक्षम शेतीसाठी आधुनिक साधने आणि उपकरणे',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      products: [
        { name: 'Seed Drill', price: 45000, unit: 'piece', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Irrigation Sprinkler', price: 2500, unit: 'piece', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Hand Tools Set', price: 1200, unit: 'set', image: 'https://images.unsplash.com/photo-1616431101491-554c0932ea4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Harvesting Knife', price: 350, unit: 'piece', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 'seeds-plants',
      title: 'Seeds & Plants',
      titleHi: 'बीज और पौधे',
      titleMr: 'बियाणे आणि रोपे',
      description: 'High-quality seeds and saplings for your farm',
      descriptionHi: 'आपके खेत के लिए उच्च गुणवत्ता वाले बीज और पौधे',
      descriptionMr: 'तुमच्या शेतासाठी उच्च दर्जाचे बियाणे आणि रोपे',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      products: [
        { name: 'Tomato Seeds', price: 250, unit: 'pack', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Fruit Saplings', price: 80, unit: 'piece', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Herb Plants', price: 45, unit: 'piece', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { name: 'Wheat Seeds', price: 180, unit: 'kg', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }
      ]
    }
  ]

  const getSectionTitle = (section) => {
    const { language } = useLanguage()
    if (language === 'hi') return section.titleHi
    if (language === 'mr') return section.titleMr
    return section.title
  }

  const getSectionDescription = (section) => {
    const { language } = useLanguage()
    if (language === 'hi') return section.descriptionHi
    if (language === 'mr') return section.descriptionMr
    return section.description
  }

  const activeSection = marketplaceSections.find(section => section.id === activeTab)

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('marketplace.title')} Marketplace
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need for modern agriculture
          </p>
        </AnimatedSection>

        {/* Category Tabs */}
        <AnimatedSection delay={200} className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {marketplaceSections.map((section, index) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(section.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {getSectionTitle(section)}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Active Section Content */}
        {activeSection && (
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
              <AnimatedSection direction="left" className="lg:w-1/2">
                <ImageWithFallback
                  src={activeSection.image}
                  alt={getSectionTitle(activeSection)}
                  className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
                />
              </AnimatedSection>
              
              <AnimatedSection direction="right" className="lg:w-1/2">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {getSectionTitle(activeSection)}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {getSectionDescription(activeSection)}
                </p>
                <div className="flex gap-4">
                  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                    Explore All
                  </button>
                  <button className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </AnimatedSection>
            </div>

            {/* Products Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {activeSection.products.map((product, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      New
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-2">{product.name}</h4>
                    <div className="text-lg font-bold text-primary mb-3">
                      ₹{product.price.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        /{product.unit}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary text-primary-foreground py-2 px-3 rounded text-sm hover:bg-primary/90 transition-colors duration-200">
                        Add to Cart
                      </button>
                      <button className="flex-1 border border-primary text-primary py-2 px-3 rounded text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Special Offers Section */}
        <AnimatedSection delay={400} className="mt-16">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <AnimatedSection direction="left">
                <h3 className="text-2xl font-bold mb-4">Special Seasonal Offers</h3>
                <p className="text-lg opacity-90 mb-4">
                  Get up to 30% off on selected seasonal products
                </p>
                <ul className="space-y-2 opacity-90">
                  <li>• Free delivery on orders above ₹1000</li>
                  <li>• Quality guarantee on all organic products</li>
                  <li>• 24/7 farmer support helpline</li>
                </ul>
              </AnimatedSection>
              
              <AnimatedSection direction="right" delay={200}>
                <div className="mt-6 lg:mt-0">
                  <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                    View All Offers
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Farmer Spotlight */}
        <AnimatedSection delay={600} className="mt-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Featured Farmers This Month
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                location: 'Maharashtra',
                specialty: 'Organic Vegetables',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                rating: 4.9,
                products: 25
              },
              {
                name: 'Priya Sharma',
                location: 'Karnataka',
                specialty: 'Exotic Fruits',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b332c589?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                rating: 4.8,
                products: 18
              },
              {
                name: 'Suresh Patel',
                location: 'Gujarat',
                specialty: 'Premium Grains',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                rating: 4.7,
                products: 32
              }
            ].map((farmer, index) => (
              <motion.div
                key={farmer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-card rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <ImageWithFallback
                  src={farmer.image}
                  alt={farmer.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="font-semibold text-foreground mb-2">{farmer.name}</h4>
                <p className="text-muted-foreground text-sm mb-3">{farmer.location}</p>
                <p className="text-primary font-medium mb-3">{farmer.specialty}</p>
                <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
                  <span>★ {farmer.rating}</span>
                  <span>{farmer.products} products</span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}