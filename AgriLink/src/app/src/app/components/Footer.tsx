import { Leaf, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Leaf className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl">AgriLink</span>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting farmers with industry to create a sustainable agricultural marketplace.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                <Mail className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                <Phone className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-6">For Farmers</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sell Your Crops</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Quality Standards</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6">For Industry</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Marketplace</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Supply Chain</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner Program</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
            
            <div className="mt-6">
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AgriLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}