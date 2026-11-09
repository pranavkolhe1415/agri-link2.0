import { Card, CardContent } from "./ui/card"
import { Leaf, TrendingUp, Shield, Clock, MapPin, Handshake } from "lucide-react"

export function Features() {
  const farmerFeatures = [
    {
      icon: TrendingUp,
      title: "Better Prices",
      description: "Get fair market prices for your crops with direct industry connections"
    },
    {
      icon: Clock,
      title: "Quick Payments",
      description: "Fast and secure payment processing within 24 hours of delivery"
    },
    {
      icon: MapPin,
      title: "Local Markets",
      description: "Connect with nearby industries to reduce transportation costs"
    }
  ]

  const industryFeatures = [
    {
      icon: Leaf,
      title: "Fresh Quality",
      description: "Source directly from farmers for the freshest agricultural products"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All crops are verified and meet industry quality standards"
    },
    {
      icon: Handshake,
      title: "Reliable Supply",
      description: "Build long-term partnerships with trusted agricultural producers"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900">
            Why Choose AgriLink?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the tools and connections needed to create a thriving agricultural marketplace
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl mb-8 text-gray-900">For Farmers</h3>
            <div className="space-y-6">
              {farmerFeatures.map((feature, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <feature.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="mb-2 text-gray-900">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl mb-8 text-gray-900">For Industry</h3>
            <div className="space-y-6">
              {industryFeatures.map((feature, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="mb-2 text-gray-900">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}