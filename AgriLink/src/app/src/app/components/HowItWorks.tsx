import { Card, CardContent } from "./ui/card"
import { Upload, Search, Handshake, Truck } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "List Your Crops",
      description: "Farmers upload their available crops with photos, quantities, and pricing",
      color: "bg-green-100 text-green-600"
    },
    {
      step: 2,
      icon: Search,
      title: "Browse & Connect",
      description: "Industries search and browse available crops based on their requirements",
      color: "bg-blue-100 text-blue-600"
    },
    {
      step: 3,
      icon: Handshake,
      title: "Negotiate & Order",
      description: "Direct communication between farmers and buyers to finalize deals",
      color: "bg-purple-100 text-purple-600"
    },
    {
      step: 4,
      icon: Truck,
      title: "Delivery & Payment",
      description: "Secure logistics coordination and guaranteed payment processing",
      color: "bg-orange-100 text-orange-600"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900">
            How AgriLink Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to connect farmers with industry buyers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              <Card className="text-center border-2 hover:border-green-200 transition-colors">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="text-lg mb-3 text-gray-900">{step.title}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
              )}
              
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                {step.step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}