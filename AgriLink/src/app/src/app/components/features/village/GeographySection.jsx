import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { MapPin, Thermometer, CloudRain, Mountain } from 'lucide-react'
import { geography } from '../data/villageData'

export function GeographySection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Physical Geography */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mountain className="h-5 w-5" />
            <span>Physical Geography</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Terrain</h4>
            <p className="text-sm text-muted-foreground">{geography.terrain}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Soil Type</h4>
            <p className="text-sm text-muted-foreground">{geography.soilType}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Water Bodies</h4>
            <div className="flex flex-wrap gap-1">
              {geography.waterBodies.map((body, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {body}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Climate Information */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5" />
            <span>Climate</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Climate Type</h4>
            <p className="text-sm text-muted-foreground">{geography.climate}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Annual Rainfall</h4>
            <p className="text-sm text-muted-foreground flex items-center space-x-1">
              <CloudRain className="h-4 w-4" />
              <span>{geography.rainfall}</span>
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Temperature Range</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Summer:</span>
                <span>{geography.temperature.summer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monsoon:</span>
                <span>{geography.temperature.monsoon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Winter:</span>
                <span>{geography.temperature.winter}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}