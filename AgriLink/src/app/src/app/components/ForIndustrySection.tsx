import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { 
  Factory, 
  TruckIcon, 
  Shield, 
  BarChart3, 
  Users, 
  Clock,
  CheckCircle,
  ArrowRight,
  Package,
  FileCheck,
  Globe,
  Zap,
  Calendar,
  DollarSign
} from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function ForIndustrySection() {
  const industryBenefits = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All products verified and certified to meet industry standards",
      stats: "99.2% quality compliance rate"
    },
    {
      icon: TruckIcon,
      title: "Reliable Supply Chain",
      description: "Direct relationships with verified farmers ensure consistent supply",
      stats: "98.5% on-time delivery"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "Eliminate middleman costs and negotiate directly with producers",
      stats: "Average savings: 15-25%"
    },
    {
      icon: Clock,
      title: "Fresh & Fast",
      description: "Farm-to-facility in 24-48 hours for maximum freshness",
      stats: "Average delivery: 36 hours"
    }
  ]

  const supplierCategories = [
    {
      category: "Organic Vegetables",
      suppliers: 245,
      volume: "5,000+ tons/month",
      price: "$2.50-8.20/kg",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      category: "Premium Grains",
      suppliers: 180,
      volume: "12,000+ tons/month",
      price: "$1.80-3.50/kg",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      category: "Fresh Fruits",
      suppliers: 320,
      volume: "8,000+ tons/month",
      price: "$3.20-9.80/kg",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      category: "Specialty Crops",
      suppliers: 95,
      volume: "2,500+ tons/month",
      price: "$5.00-25.00/kg",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]

  const partnerCompanies = [
    { name: "Fresh Foods Corp", type: "Food Processing", volume: "2,000 tons/month" },
    { name: "Organic Solutions Inc", type: "Organic Products", volume: "1,500 tons/month" },
    { name: "Global Harvest Ltd", type: "Export Trading", volume: "3,500 tons/month" },
    { name: "Natural Ingredients Co", type: "Food Manufacturing", volume: "1,200 tons/month" },
    { name: "Premium Produce Group", type: "Retail Distribution", volume: "4,000 tons/month" }
  ]

  const features = [
    {
      icon: Package,
      title: "Bulk Ordering System",
      description: "Place large volume orders with flexible delivery schedules"
    },
    {
      icon: FileCheck,
      title: "Quality Documentation",
      description: "Complete traceability with certificates and lab reports"
    },
    {
      icon: Globe,
      title: "Global Sourcing",
      description: "Access to suppliers across multiple regions and countries"
    },
    {
      icon: Zap,
      title: "Real-time Inventory",
      description: "Live updates on availability and pricing changes"
    },
    {
      icon: Calendar,
      title: "Contract Farming",
      description: "Secure future supply with pre-season contracts"
    },
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Detailed market insights and price forecasting tools"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 mb-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl mb-6">
                Scale Your Supply Chain
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Connect directly with verified farmers and secure your agricultural supply chain with transparent pricing and guaranteed quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Sourcing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Request Demo
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl mb-1">500+</div>
                  <div className="text-sm text-blue-200">Industry Partners</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">50K</div>
                  <div className="text-sm text-blue-200">Tons Traded</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">99.2%</div>
                  <div className="text-sm text-blue-200">Quality Rate</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Food processing facility"
                className="rounded-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="benefits" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
          </TabsList>

          <TabsContent value="benefits" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {industryBenefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-4 rounded-lg">
                        <benefit.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl mb-2">{benefit.title}</h3>
                        <p className="text-gray-600 mb-3">{benefit.description}</p>
                        <div className="text-sm text-blue-600">{benefit.stats}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {supplierCategories.map((category, index) => (
                <Card key={index} className="border-0 shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.category}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-700">
                        {category.suppliers} Suppliers
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl mb-4">{category.category}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Volume:</span>
                        <span>{category.volume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price Range:</span>
                        <span className="text-green-600">{category.price}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Browse Suppliers
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 p-4 rounded-lg w-fit mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partners" className="mt-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Factory className="h-6 w-6 mr-2 text-blue-600" />
                  Current Industry Partners
                </CardTitle>
                <p className="text-gray-600">Leading companies already sourcing through AgriLink</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {partnerCompanies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Factory className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-lg">{company.name}</div>
                          <div className="text-sm text-gray-600">{company.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-600">{company.volume}</div>
                        <div className="text-sm text-gray-600">Monthly Volume</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Process Section */}
        <Card className="border-0 shadow-md mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">How It Works for Industry</CardTitle>
            <p className="text-gray-600">Streamlined procurement process in 4 simple steps</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Browse & Search", desc: "Find suppliers by crop type, location, and certification" },
                { step: 2, title: "Request Quotes", desc: "Get competitive quotes from multiple verified suppliers" },
                { step: 3, title: "Place Orders", desc: "Secure your supply with flexible contract terms" },
                { step: 4, title: "Track & Receive", desc: "Monitor delivery and receive quality documentation" }
              ].map((item, index) => (
                <div key={item.step} className="text-center relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h4 className="text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-8 text-center">
            <Factory className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl mb-4">Ready to Optimize Your Supply Chain?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join industry leaders who trust AgriLink for their agricultural sourcing needs. Start building direct relationships with quality suppliers today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Create Buyer Account
              </Button>
              <Button variant="outline" size="lg">
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}