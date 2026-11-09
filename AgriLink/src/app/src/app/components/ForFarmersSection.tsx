import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Shield, 
  Camera, 
  FileText, 
  Calendar,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Leaf,
  Truck,
  Clock
} from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function ForFarmersSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Higher Profits",
      description: "Earn 20-40% more by selling directly to industries",
      stats: "Average increase: $2,400/month"
    },
    {
      icon: Clock,
      title: "Quick Payments",
      description: "Get paid within 24 hours of delivery confirmation",
      stats: "Payment guarantee: 99.8%"
    },
    {
      icon: Users,
      title: "Direct Buyers",
      description: "Connect with verified food processing companies",
      stats: "500+ active buyers"
    },
    {
      icon: Shield,
      title: "Quality Support",
      description: "Free quality certification and grading assistance",
      stats: "95% pass rate"
    }
  ]

  const pricingGuide = [
    { crop: "Organic Tomatoes", season: "Peak", price: "$4.20-5.50/kg", demand: "High" },
    { crop: "Premium Wheat", season: "Harvest", price: "$2.10-2.40/kg", demand: "Very High" },
    { crop: "Fresh Apples", season: "Fall", price: "$3.60-4.20/kg", demand: "Medium" },
    { crop: "Baby Spinach", season: "Year-round", price: "$5.80-7.20/kg", demand: "High" },
    { crop: "Organic Corn", season: "Summer", price: "$1.80-2.20/kg", demand: "High" }
  ]

  const onboardingSteps = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Set up your farm profile with photos and certifications",
      completed: true
    },
    {
      step: 2,
      title: "Upload First Crop",
      description: "List your first crop with photos and details",
      completed: true
    },
    {
      step: 3,
      title: "Get Verified",
      description: "Complete our quick verification process",
      completed: false
    },
    {
      step: 4,
      title: "Start Selling",
      description: "Begin receiving orders from industry buyers",
      completed: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 mb-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl mb-6">
                Grow Your Farm Business
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Join thousands of farmers earning better profits by selling directly to food industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  Start Selling Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Watch Demo
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl mb-1">1,200+</div>
                  <div className="text-sm text-green-200">Active Farmers</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">$2.4M+</div>
                  <div className="text-sm text-green-200">Paid to Farmers</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">4.9/5</div>
                  <div className="text-sm text-green-200">Farmer Rating</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Happy farmer in field"
                className="rounded-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="benefits" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Guide</TabsTrigger>
            <TabsTrigger value="onboarding">Get Started</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="benefits" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-4 rounded-lg">
                        <benefit.icon className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl mb-2">{benefit.title}</h3>
                        <p className="text-gray-600 mb-3">{benefit.description}</p>
                        <div className="text-sm text-green-600">{benefit.stats}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="mt-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
                  Current Market Prices
                </CardTitle>
                <p className="text-gray-600">Updated daily based on real market data</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Crop</th>
                        <th className="text-left py-3 px-4">Season</th>
                        <th className="text-left py-3 px-4">Price Range</th>
                        <th className="text-left py-3 px-4">Demand</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingGuide.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{item.crop}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{item.season}</Badge>
                          </td>
                          <td className="py-3 px-4 text-green-600">{item.price}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              className={
                                item.demand === "Very High" ? "bg-red-100 text-red-800" :
                                item.demand === "High" ? "bg-orange-100 text-orange-800" :
                                "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {item.demand}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="onboarding" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Quick Start Guide</CardTitle>
                  <p className="text-gray-600">Get selling in 4 simple steps</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {onboardingSteps.map((step) => (
                      <div key={step.step} className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {step.completed ? <CheckCircle className="h-5 w-5" /> : step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Progress value={50} className="mb-2" />
                    <p className="text-sm text-gray-600">2 of 4 steps completed</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Success Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="Farmer testimonial"
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <blockquote className="text-lg mb-4 italic">
                      "AgriLink helped me increase my income by 35% in just 6 months. The direct connection with buyers eliminated middlemen costs."
                    </blockquote>
                    <div>
                      <div>Sarah Johnson</div>
                      <div className="text-sm text-gray-600">Organic Farm, California</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl text-green-600">+35%</div>
                        <div className="text-sm text-gray-600">Income Increase</div>
                      </div>
                      <div>
                        <div className="text-2xl text-green-600">6 Mo</div>
                        <div className="text-sm text-gray-600">Time to ROI</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <Camera className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">Photo Guidelines</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Learn how to take professional crop photos that sell
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">Quality Certificates</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get help with organic certification and quality standards
                  </p>
                  <Button variant="outline" size="sm">Get Certified</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">Logistics Support</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Find reliable transportation and packaging solutions
                  </p>
                  <Button variant="outline" size="sm">Find Partners</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <Leaf className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl mb-4">Ready to Transform Your Farm Business?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join AgriLink today and start connecting with premium buyers who value quality agricultural products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Create Free Account
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}