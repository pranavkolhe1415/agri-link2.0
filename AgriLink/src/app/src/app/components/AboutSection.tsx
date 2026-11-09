import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { 
  Leaf, 
  Users, 
  Globe, 
  Award,
  Heart,
  Target,
  Lightbulb,
  Shield,
  MapPin,
  Mail,
  Phone,
  Calendar
} from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function AboutSection() {
  const stats = [
    { number: "1,200+", label: "Active Farmers", icon: Users },
    { number: "500+", label: "Industry Partners", icon: Globe },
    { number: "50K+", label: "Tons Traded", icon: Award },
    { number: "99.2%", label: "Quality Rate", icon: Shield }
  ]

  const values = [
    {
      icon: Heart,
      title: "Fairness",
      description: "We believe in fair trade and equitable pricing for all participants in the agricultural supply chain."
    },
    {
      icon: Shield,
      title: "Quality",
      description: "We maintain the highest standards of quality assurance to ensure safe, reliable agricultural products."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We leverage technology to create efficient solutions that benefit both farmers and industry partners."
    },
    {
      icon: Target,
      title: "Sustainability",
      description: "We promote sustainable farming practices and responsible supply chain management."
    }
  ]

  const timeline = [
    {
      year: "2020",
      title: "Company Founded",
      description: "AgriLink was established with a mission to connect farmers directly with industry buyers."
    },
    {
      year: "2021",
      title: "First 100 Farmers",
      description: "Reached our first milestone of 100 registered farmers across 5 states."
    },
    {
      year: "2022",
      title: "Industry Expansion",
      description: "Partnered with major food processing companies and expanded to 15 states."
    },
    {
      year: "2023",
      title: "Quality Certification",
      description: "Launched our quality assurance program with certified testing laboratories."
    },
    {
      year: "2024",
      title: "National Coverage",
      description: "Achieved nationwide coverage with over 1,000 farmers and 500 industry partners."
    },
    {
      year: "2025",
      title: "Global Vision",
      description: "Expanding internationally to connect global agricultural markets."
    }
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former agricultural economist with 15+ years experience in supply chain optimization.",
      image: "https://images.unsplash.com/photo-1494790108755-2616c5e49d0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Tech veteran with expertise in marketplace platforms and agricultural technology.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Quality Assurance",
      bio: "Agricultural scientist specializing in food safety and quality standards.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "James Thompson",
      role: "Head of Farmer Relations",
      bio: "Third-generation farmer turned agricultural consultant with deep industry connections.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Leaf className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl lg:text-6xl mb-6 text-gray-900">
            About AgriLink
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing agriculture by creating direct connections between farmers 
            and food industries, ensuring fair prices, quality products, and sustainable practices.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md text-center">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl mb-2 text-gray-900">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="border-0 shadow-md">
            <CardContent className="p-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To create a transparent, efficient, and fair agricultural marketplace that empowers 
                farmers to get better prices for their crops while providing industries with reliable 
                access to high-quality agricultural products.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that by eliminating intermediaries and facilitating direct relationships, 
                we can create value for all participants in the agricultural supply chain.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To become the global leader in agricultural marketplace solutions, transforming 
                how agricultural products move from farm to industry while promoting sustainable 
                farming practices and food security.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where every farmer has access to fair markets and every 
                food company can source quality ingredients directly from trusted producers.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md text-center">
                <CardContent className="p-6">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              From startup to agricultural marketplace leader
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-green-600">{item.year}</Badge>
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-md"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Passionate experts dedicated to transforming agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-md text-center">
                <CardContent className="p-6">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <div className="text-green-600 mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Have questions about AgriLink? Want to learn more about our platform? 
                  We'd love to hear from you.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span>San Francisco, CA 94105</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <span>hello@agrilink.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Contact Sales
                  </Button>
                  <Button variant="outline">
                    Support Center
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="AgriLink office"
                  className="rounded-xl w-full h-80 object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}