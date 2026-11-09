import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Music, Calendar, Users, Utensils } from 'lucide-react'
import { culture } from '../data/villageData'

export function CultureSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Languages & Festivals */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Languages & Festivals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Languages Spoken</h4>
            <div className="flex flex-wrap gap-1">
              {culture.languages.map((language, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Major Festivals</h4>
            <div className="flex flex-wrap gap-1">
              {culture.festivals.map((festival, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {festival}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traditions & Cuisine */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Music className="h-5 w-5" />
            <span>Traditions & Cuisine</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Cultural Traditions</h4>
            <div className="space-y-1">
              {culture.traditions.map((tradition, index) => (
                <div key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>{tradition}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Traditional Cuisine</h4>
            <div className="flex flex-wrap gap-1">
              {culture.cuisine.map((dish, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Utensils className="h-3 w-3 mr-1" />
                  {dish}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}