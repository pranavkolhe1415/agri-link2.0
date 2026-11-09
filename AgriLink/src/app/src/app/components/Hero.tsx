import { Button } from "./ui/button"
import { ArrowRight, Truck, Users, ShoppingCart } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl mb-6 text-gray-900">
              Connecting Farmers with Industry
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              AgriLink bridges the gap between agricultural producers and food industries, 
              creating a seamless marketplace for fresh crops and agricultural products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Selling Crops
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Browse Marketplace
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl mb-1">1,200+</div>
                <div className="text-sm text-gray-600">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl mb-1">500+</div>
                <div className="text-sm text-gray-600">Industry Partners</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl mb-1">50K+</div>
                <div className="text-sm text-gray-600">Tons Traded</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Farmer in crop field"
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-sm text-gray-600 mb-1">Today's Harvest</div>
              <div className="text-2xl text-green-600 mb-1">2,450 tons</div>
              <div className="text-sm text-gray-500">+12% from yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}