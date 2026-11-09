import { Button } from "./ui/button"
import { Leaf, Menu, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface HeaderProps {
  currentSection: string
  onSectionChange: (section: string) => void
}

export function Header({ currentSection, onSectionChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">AgriLink</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onSectionChange('home')}
              className={`hover:text-green-600 transition-colors ${currentSection === 'home' ? 'text-green-600' : 'text-gray-700'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onSectionChange('marketplace')}
              className={`hover:text-green-600 transition-colors ${currentSection === 'marketplace' ? 'text-green-600' : 'text-gray-700'}`}
            >
              Marketplace
            </button>
            <button 
              onClick={() => onSectionChange('farmers')}
              className={`hover:text-green-600 transition-colors ${currentSection === 'farmers' ? 'text-green-600' : 'text-gray-700'}`}
            >
              For Farmers
            </button>
            <button 
              onClick={() => onSectionChange('industry')}
              className={`hover:text-green-600 transition-colors ${currentSection === 'industry' ? 'text-green-600' : 'text-gray-700'}`}
            >
              For Industry
            </button>
            <button 
              onClick={() => onSectionChange('about')}
              className={`hover:text-green-600 transition-colors ${currentSection === 'about' ? 'text-green-600' : 'text-gray-700'}`}
            >
              About
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">Get Started</Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="md:hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-8 px-3 hover:bg-accent hover:text-accent-foreground">
                <Menu className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onSectionChange('home')}>Home</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSectionChange('marketplace')}>Marketplace</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSectionChange('farmers')}>For Farmers</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSectionChange('industry')}>For Industry</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSectionChange('about')}>About</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}