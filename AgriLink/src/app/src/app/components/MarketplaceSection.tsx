import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { MapPin, Star, Search, Filter, Clock, Truck } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function MarketplaceSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const crops = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      location: "California, USA",
      price: "$4.50/kg",
      originalPrice: "$5.20/kg",
      quantity: "500 kg",
      rating: 4.8,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Organic", "Fresh", "Grade A"],
      category: "vegetables",
      harvestDate: "2 days ago",
      deliveryTime: "1-2 days"
    },
    {
      id: 2,
      name: "Premium Wheat",
      farmer: "Sunrise Acres",
      location: "Iowa, USA",
      price: "$2.20/kg",
      originalPrice: "$2.40/kg",
      quantity: "2000 kg",
      rating: 4.9,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Premium", "Grade A", "Non-GMO"],
      category: "grains",
      harvestDate: "1 week ago",
      deliveryTime: "3-5 days"
    },
    {
      id: 3,
      name: "Fresh Apples",
      farmer: "Mountain View Orchard",
      location: "Washington, USA",
      price: "$3.80/kg",
      originalPrice: "$4.10/kg",
      quantity: "800 kg",
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Fresh", "Export Quality", "Sweet"],
      category: "fruits",
      harvestDate: "3 days ago",
      deliveryTime: "2-3 days"
    },
    {
      id: 4,
      name: "Organic Corn",
      farmer: "Prairie Gold Farm",
      location: "Nebraska, USA",
      price: "$1.95/kg",
      originalPrice: "$2.15/kg",
      quantity: "1500 kg",
      rating: 4.6,
      reviews: 34,
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Organic", "Non-GMO", "Fresh"],
      category: "grains",
      harvestDate: "5 days ago",
      deliveryTime: "2-4 days"
    },
    {
      id: 5,
      name: "Baby Spinach",
      farmer: "Leafy Greens Co.",
      location: "California, USA",
      price: "$6.20/kg",
      originalPrice: "$6.80/kg",
      quantity: "200 kg",
      rating: 4.9,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Organic", "Baby Leaves", "Fresh"],
      category: "vegetables",
      harvestDate: "1 day ago",
      deliveryTime: "Same day"
    },
    {
      id: 6,
      name: "Wild Rice",
      farmer: "Northern Harvest",
      location: "Minnesota, USA",
      price: "$8.90/kg",
      originalPrice: "$9.50/kg",
      quantity: "300 kg",
      rating: 4.8,
      reviews: 23,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      tags: ["Wild", "Premium", "Rare"],
      category: "grains",
      harvestDate: "1 week ago",
      deliveryTime: "3-5 days"
    }
  ]

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.farmer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || crop.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || crop.location.includes(selectedLocation)
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-4 text-gray-900">Agricultural Marketplace</h1>
          <p className="text-xl text-gray-600">
            Discover fresh, high-quality crops directly from farmers across the country
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search crops or farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="herbs">Herbs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Iowa">Iowa</SelectItem>
                <SelectItem value="Washington">Washington</SelectItem>
                <SelectItem value="Nebraska">Nebraska</SelectItem>
                <SelectItem value="Minnesota">Minnesota</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCrops.length} results
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Crop Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <div className="relative">
                <ImageWithFallback
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {crop.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-600 text-white">
                    {((parseFloat(crop.originalPrice.slice(1)) - parseFloat(crop.price.slice(1))) / parseFloat(crop.originalPrice.slice(1)) * 100).toFixed(0)}% OFF
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{crop.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {crop.location}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{crop.rating}</span>
                    <span className="text-xs text-gray-500">({crop.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">By {crop.farmer}</div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      Harvested {crop.harvestDate}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl text-green-600">{crop.price}</span>
                      <span className="text-sm text-gray-500 line-through">{crop.originalPrice}</span>
                    </div>
                    <div className="text-sm text-gray-500">{crop.quantity} available</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-green-600">
                      <Truck className="h-4 w-4 mr-1" />
                      {crop.deliveryTime}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Order Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Contact Farmer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No crops found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLocation("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}