import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      marketplace: 'Marketplace',
      farmers: 'For Farmers',
      industry: 'For Industry',
      about: 'About',
      products: 'All Products',
      contact: 'Contact'
    },
    
    // Hero Section
    hero: {
      title: 'Connecting Farmers to Markets',
      subtitle: 'Empowering agricultural communities through direct market access and fair pricing',
      cta: 'Get Started',
      learnMore: 'Learn More',
      stats: {
        farmers: 'Active Farmers',
        products: 'Products Listed',
        sales: 'Successful Sales'
      }
    },
    
    // Features
    features: {
      title: 'Why Choose Our Platform',
      subtitle: 'We provide comprehensive solutions for modern agriculture',
      items: {
        directSales: {
          title: 'Direct Sales',
          description: 'Sell directly to consumers and businesses'
        },
        fairPricing: {
          title: 'Fair Pricing',
          description: 'Get the best price for your produce'
        },
        qualityAssurance: {
          title: 'Quality Assurance',
          description: 'Maintain high standards with our quality checks'
        },
        logistics: {
          title: 'Logistics Support',
          description: 'End-to-end delivery and transportation'
        }
      }
    },
    
    // Marketplace
    marketplace: {
      title: 'Featured Products',
      subtitle: 'Fresh from farm to table',
      viewAll: 'View All Products',
      categories: {
        vegetables: 'Vegetables',
        fruits: 'Fruits',
        grains: 'Grains',
        dairy: 'Dairy',
        organic: 'Organic',
        spices: 'Spices'
      },
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      perKg: 'per kg',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock'
    },
    
    // How It Works
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Simple steps to get started',
      steps: {
        register: {
          title: 'Register',
          description: 'Create your account as farmer or buyer'
        },
        list: {
          title: 'List Products',
          description: 'Add your products with photos and details'
        },
        connect: {
          title: 'Connect',
          description: 'Connect with buyers and negotiate prices'
        },
        deliver: {
          title: 'Deliver',
          description: 'Arrange delivery and get paid securely'
        }
      }
    },
    
    // Products Page
    products: {
      title: 'All Products',
      subtitle: 'Discover fresh produce from local farmers',
      search: 'Search products...',
      filter: 'Filter',
      sortBy: 'Sort By',
      categories: 'Categories',
      priceRange: 'Price Range',
      location: 'Location',
      rating: 'Rating',
      availability: 'Availability'
    },
    
    // Footer
    footer: {
      company: 'AgriConnect',
      description: 'Connecting farmers to markets for a sustainable future',
      quickLinks: 'Quick Links',
      contact: 'Contact Info',
      followUs: 'Follow Us',
      rights: 'All rights reserved',
      phone: 'Phone',
      email: 'Email',
      address: 'Address'
    },
    
    // Login Page
    login: {
      title: 'Welcome to AgriConnect',
      subtitle: 'Choose how you would like to continue',
      farmer: 'Login as Farmer',
      farmerDesc: 'Access tools, resources and market connections built for farmers',
      industry: 'Login as Industry',
      industryDesc: 'Discover fresh produce and connect directly with local farmers'
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Try Again',
      save: 'Save',
      cancel: 'Cancel',
      submit: 'Submit',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      open: 'Open',
      more: 'More',
      less: 'Less',
      by: 'by'
    }
  },

  hi: {
    // Navigation
    nav: {
      home: 'होम',
      marketplace: 'बाजार',
      farmers: 'किसानों के लिए',
      industry: 'उद्योग के लिए',
      about: 'हमारे बारे में',
      products: 'सभी उत्पाद',
      contact: 'संपर्क'
    },
    
    // Hero Section
    hero: {
      title: 'किसानों को बाजारों से जोड़ना',
      subtitle: 'प्रत्यक्ष बाजार पहुंच और उचित मूल्य के माध्यम से कृषि समुदायों को सशक्त बनाना',
      cta: 'शुरू करें',
      learnMore: 'और जानें',
      stats: {
        farmers: 'सक्रिय किसान',
        products: 'सूचीबद्ध उत्पाद',
        sales: 'सफल बिक्री'
      }
    },
    
    // Features
    features: {
      title: 'हमारे प्लेटफॉर्म को क्यों चुनें',
      subtitle: 'हम आधुनिक कृषि के लिए व्यापक समाधान प्रदान करते हैं',
      items: {
        directSales: {
          title: 'प्रत्यक्ष बिक्री',
          description: 'उपभोक्ताओं और व्यवसायों को सीधे बेचें'
        },
        fairPricing: {
          title: 'उचित मूल्य',
          description: 'अपनी उपज के लिए सबसे अच्छा दाम पाएं'
        },
        qualityAssurance: {
          title: 'गुणवत्ता आश्वासन',
          description: 'हमारी गुणवत्ता जांच के साथ उच्च मानक बनाए रखें'
        },
        logistics: {
          title: 'रसद सहायता',
          description: 'एंड-टू-एंड डिलीवरी और परिवहन'
        }
      }
    },
    
    // Marketplace
    marketplace: {
      title: 'फीचर्ड उत्पाद',
      subtitle: 'खेत से टेबल तक ताजा',
      viewAll: 'सभी उत्पाद देखें',
      categories: {
        vegetables: 'सब्जियां',
        fruits: 'फल',
        grains: 'अनाज',
        dairy: 'डेयरी',
        organic: 'जैविक',
        spices: 'मसाले'
      },
      addToCart: 'कार्ट में जोड़ें',
      buyNow: 'अभी खरीदें',
      perKg: 'प्रति किलो',
      inStock: 'स्टॉक में',
      outOfStock: 'स्टॉक खत्म'
    },
    
    // How It Works
    howItWorks: {
      title: 'यह कैसे काम करता है',
      subtitle: 'शुरू करने के लिए सरल कदम',
      steps: {
        register: {
          title: 'पंजीकरण',
          description: 'किसान या खरीदार के रूप में अपना खाता बनाएं'
        },
        list: {
          title: 'उत्पाद सूची',
          description: 'फोटो और विवरण के साथ अपने उत्पाद जोड़ें'
        },
        connect: {
          title: 'जुड़ें',
          description: 'खरीदारों से जुड़ें और कीमतों पर बातचीत करें'
        },
        deliver: {
          title: 'डिलीवर करें',
          description: 'डिलीवरी की व्यवस्था करें और सुरक्षित भुगतान पाएं'
        }
      }
    },
    
    // Products Page
    products: {
      title: 'सभी उत्पाद',
      subtitle: 'स्थानीय किसानों से ताजी उपज की खोज करें',
      search: 'उत्पाद खोजें...',
      filter: 'फिल्टर',
      sortBy: 'क्रमबद्ध करें',
      categories: 'श्रेणियां',
      priceRange: 'मूल्य सीमा',
      location: 'स्थान',
      rating: 'रेटिंग',
      availability: 'उपलब्धता'
    },
    
    // Footer
    footer: {
      company: 'एग्रीकनेक्ट',
      description: 'स्थायी भविष्य के लिए किसानों को बाजारों से जोड़ना',
      quickLinks: 'त्वरित लिंक',
      contact: 'संपर्क जानकारी',
      followUs: 'हमें फॉलो करें',
      rights: 'सभी अधिकार सुरक्षित',
      phone: 'फोन',
      email: 'ईमेल',
      address: 'पता'
    },
    
    // Login Page
    login: {
      title: 'एग्रीकनेक्ट में आपका स्वागत है',
      subtitle: 'चुनें कि आप कैसे जारी रखना चाहते हैं',
      farmer: 'किसान के रूप में लॉगिन',
      farmerDesc: 'किसानों के लिए बनाए गए टूल, संसाधन और बाजार कनेक्शन तक पहुंचें',
      industry: 'उद्योग के रूप में लॉगिन',
      industryDesc: 'ताजी उपज की खोज करें और स्थानीय किसानों से सीधे जुड़ें'
    },

    // Common
    common: {
      loading: 'लोड हो रहा है...',
      error: 'कुछ गलत हुआ',
      retry: 'पुनः प्रयास करें',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      submit: 'जमा करें',
      next: 'अगला',
      previous: 'पिछला',
      close: 'बंद करें',
      open: 'खोलें',
      more: 'अधिक',
      less: 'कम',
      by: 'द्वारा'
    }
  },

  mr: {
    // Navigation
    nav: {
      home: 'होम',
      marketplace: 'बाजारपेठ',
      farmers: 'शेतकऱ्यांसाठी',
      industry: 'उद्योगासाठी',
      about: 'आमच्याबद्दल',
      products: 'सर्व उत्पादने',
      contact: 'संपर्क'
    },
    
    // Hero Section
    hero: {
      title: 'शेतकऱ्यांना बाजारपेठेशी जोडणे',
      subtitle: 'प्रत्यक्ष बाजार प्रवेश आणि न्याय्य किंमतीद्वारे कृषी समुदायांना सक्षम करणे',
      cta: 'सुरुवात करा',
      learnMore: 'अधिक जाणून घ्या',
      stats: {
        farmers: 'सक्रिय शेतकरी',
        products: 'यादीबद्ध उत्पादने',
        sales: 'यशस्वी विक्री'
      }
    },
    
    // Features
    features: {
      title: 'आमचे प्लॅटफॉर्म का निवडावे',
      subtitle: 'आम्ही आधुनिक शेतीसाठी सर्वसमावेशक उपाय प्रदान करतो',
      items: {
        directSales: {
          title: 'प्रत्यक्ष विक्री',
          description: 'ग्राहक आणि व्यवसायांना थेट विका'
        },
        fairPricing: {
          title: 'न्याय्य किंमत',
          description: 'तुमच्या उत्पादनासाठी सर्वोत्तम किंमत मिळवा'
        },
        qualityAssurance: {
          title: 'गुणवत्ता हमी',
          description: 'आमच्या गुणवत्ता तपासणीसह उच्च मानके राखा'
        },
        logistics: {
          title: 'रसद सहाय्य',
          description: 'एंड-टू-एंड डिलिव्हरी आणि वाहतूक'
        }
      }
    },
    
    // Marketplace
    marketplace: {
      title: 'वैशिष्ट्यीकृत उत्पादने',
      subtitle: 'शेतातून थेट टेबलावर',
      viewAll: 'सर्व उत्पादने पहा',
      categories: {
        vegetables: 'भाज्या',
        fruits: 'फळे',
        grains: 'धान्य',
        dairy: 'डेअरी',
        organic: 'सेंद्रिय',
        spices: 'मसाले'
      },
      addToCart: 'कार्टमध्ये घाला',
      buyNow: 'आता खरेदी करा',
      perKg: 'प्रति किलो',
      inStock: 'स्टॉकमध्ये',
      outOfStock: 'स्टॉक संपला'
    },
    
    // How It Works
    howItWorks: {
      title: 'हे कसे कार्य करते',
      subtitle: 'सुरुवात करण्यासाठी सोप्या पायऱ्या',
      steps: {
        register: {
          title: 'नोंदणी',
          description: 'शेतकरी किंवा खरेदीदार म्हणून तुमचे खाते तयार करा'
        },
        list: {
          title: 'उत्पादने यादी',
          description: 'फोटो आणि तपशीलांसह तुमची उत्पादने जोडा'
        },
        connect: {
          title: 'जोडा',
          description: 'खरेदीदारांशी जोडा आणि किंमतीवर चर्चा करा'
        },
        deliver: {
          title: 'डिलिव्हरी',
          description: 'डिलिव्हरीची व्यवस्था करा आणि सुरक्षित पेमेंट घ्या'
        }
      }
    },
    
    // Products Page
    products: {
      title: 'सर्व उत्पादने',
      subtitle: 'स्थानिक शेतकऱ्यांकडून ताजी उत्पादने शोधा',
      search: 'उत्पादने शोधा...',
      filter: 'फिल्टर',
      sortBy: 'क्रमवारी',
      categories: 'श्रेणी',
      priceRange: 'किंमत श्रेणी',
      location: 'स्थान',
      rating: 'रेटिंग',
      availability: 'उपलब्धता'
    },
    
    // Footer
    footer: {
      company: 'अॅग्रीकनेक्ट',
      description: 'शाश्वत भविष्यासाठी शेतकऱ्यांना बाजारपेठेशी जोडणे',
      quickLinks: 'द्रुत दुवे',
      contact: 'संपर्क माहिती',
      followUs: 'आम्हाला फॉलो करा',
      rights: 'सर्व हक्क राखीव',
      phone: 'फोन',
      email: 'ईमेल',
      address: 'पत्ता'
    },
    
    // Login Page
    login: {
      title: 'अॅग्रीकनेक्टमध्ये आपले स्वागत आहे',
      subtitle: 'तुम्हाला कसे पुढे जायचे आहे ते निवडा',
      farmer: 'शेतकरी म्हणून लॉगिन',
      farmerDesc: 'शेतकऱ्यांसाठी तयार केलेली साधने, संसाधने आणि बाजार कनेक्शन वापरा',
      industry: 'उद्योग म्हणून लॉगिन',
      industryDesc: 'ताजी उत्पादने शोधा आणि स्थानिक शेतकऱ्यांशी थेट जोडा'
    },

    // Common
    common: {
      loading: 'लोड होत आहे...',
      error: 'काहीतरी चूक झाली',
      retry: 'पुन्हा प्रयत्न करा',
      save: 'जतन करा',
      cancel: 'रद्द करा',
      submit: 'सबमिट करा',
      next: 'पुढील',
      previous: 'मागील',
      close: 'बंद करा',
      open: 'उघडा',
      more: 'अधिक',
      less: 'कमी',
      by: 'द्वारे'
    }
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('agrilink_language') || 'en')

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return value || key
  }

  const changeLanguage = (lang) => {
    if (lang === 'en' || lang === 'hi') {
      setLanguage(lang)
      localStorage.setItem('agrilink_language', lang)
    }
  }

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', native: 'English' },
      { code: 'hi', name: 'Hindi', native: 'हिंदी' }
    ]
  }

  return (
    <LanguageContext.Provider value={value}>
      <div className={language === 'hi' ? 'font-devanagari' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}