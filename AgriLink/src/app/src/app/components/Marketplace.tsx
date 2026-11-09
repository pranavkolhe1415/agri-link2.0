import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { MapPin, Star } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function Marketplace() {
  const crops = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      location: "California, USA",
      price: "$4.50/kg",
      quantity: "500 kg",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Organic", "Fresh"]
    },
    {
      id: 2,
      name: "Premium Wheat",
      farmer: "Sunrise Acres",
      location: "Iowa, USA",
      price: "$2.20/kg",
      quantity: "2000 kg",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Premium", "Grade A"]
    },
    {
      id: 3,
      name: "Fresh Apples",
      farmer: "Mountain View Orchard",
      location: "Washington, USA",
      price: "$3.80/kg",
      quantity: "800 kg",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Fresh", "Export Quality"]
    },
    {
      id: 4,
      name: "Organic Corn",
      farmer: "Prairie Gold Farm",
      location: "Nebraska, USA",
      price: "$1.95/kg",
      quantity: "1500 kg",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Organic", "Non-GMO"]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900">
            Featured Crops
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover fresh, high-quality agricultural products from trusted farmers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {crops.map((crop) => (
            <Card key={crop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {crop.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/90 text-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{crop.name}</CardTitle>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {crop.location}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-3">
                  <div className="text-sm text-gray-600 mb-1">By {crop.farmer}</div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{crop.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-lg text-green-600">{crop.price}</div>
                    <div className="text-sm text-gray-500">{crop.quantity} available</div>
                  </div>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}