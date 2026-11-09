import { Card, CardContent } from '../../ui/card'
import { MapPin, Calendar } from 'lucide-react'
import { ImageWithFallback } from '../../figma/ImageWithFallback'

export function VillageHeader({ villageData }) {
  return (
    <Card className="card-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Shivapur Village"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl font-bold mb-2">{villageData.name} Village</h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{villageData.district}, {villageData.state}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Est. {villageData.established}</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-600">{villageData.population.total.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Population</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">{villageData.demographics.households}</div>
              <div className="text-sm text-muted-foreground">Households</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-purple-600">{villageData.area}</div>
              <div className="text-sm text-muted-foreground">Area</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-orange-600">{villageData.population.literacy}%</div>
              <div className="text-sm text-muted-foreground">Literacy</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">District:</span>
                  <span>{villageData.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tehsil:</span>
                  <span>{villageData.tehsil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PIN Code:</span>
                  <span>{villageData.pincode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span>{villageData.coordinates.latitude}, {villageData.coordinates.longitude}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+91-20-12345678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>shivapur.village@gov.in</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🌐</span>
                  <span>www.shivapur.gov.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}