import { useState } from 'react'
import { LanguageProvider } from "./components/contexts/LanguageContext"
import { ThemeProvider } from "./components/contexts/ThemeContext"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Features } from "./components/Features"
import { Marketplace } from "./components/Marketplace"
import { HowItWorks } from "./components/HowItWorks"
import { Footer } from "./components/Footer"
import { MarketplaceSection } from "./components/MarketplaceSection"
import { ForFarmersSection } from "./components/ForFarmersSection"
import { ForIndustrySection } from "./components/ForIndustrySection"
import { AboutSection } from "./components/AboutSection"
import { AllProductsSection } from "./components/AllProductsSection"

export default function App() {
  const [currentSection, setCurrentSection] = useState('home')

  const renderSection = () => {
    switch (currentSection) {
      case 'marketplace':
        return <MarketplaceSection />
      case 'farmers':
        return <ForFarmersSection />
      case 'industry':
        return <ForIndustrySection />
      case 'about':
        return <AboutSection />
      case 'products':
        return <AllProductsSection />
      default:
        return (
          <>
            <Hero />
            <Features />
            <Marketplace />
            <AllProductsSection />
            <HowItWorks />
          </>
        )
    }
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <Header currentSection={currentSection} onSectionChange={setCurrentSection} />
          {renderSection()}
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}