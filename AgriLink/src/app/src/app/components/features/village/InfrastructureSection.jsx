import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Progress } from '../../ui/progress'
import { Badge } from '../../ui/badge'
import { Zap, Droplets, Wifi, Building } from 'lucide-react'

export function InfrastructureSection({ villageData }) {
  const getProgressColor = (value) => {
    if (value >= 90) return 'bg-green-500'
    if (value >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Infrastructure Coverage */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Infrastructure Coverage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Electricity</span>
              </span>
              <span className="font-semibold">{villageData.infrastructure.electricity}%</span>
            </div>
            <Progress value={villageData.infrastructure.electricity} className={getProgressColor(villageData.infrastructure.electricity)} />
            
            <div className="flex justify-between items-center">
              <span className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span>Water Supply</span>
              </span>
              <span className="font-semibold">{villageData.infrastructure.water}%</span>
            </div>
            <Progress value={villageData.infrastructure.water} className={getProgressColor(villageData.infrastructure.water)} />
            
            <div className="flex justify-between items-center">
              <span className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-purple-500" />
                <span>Internet</span>
              </span>
              <span className="font-semibold">{villageData.infrastructure.internet}%</span>
            </div>
            <Progress value={villageData.infrastructure.internet} className={getProgressColor(villageData.infrastructure.internet)} />
            
            <div className="flex justify-between items-center">
              <span className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-green-500" />
                <span>Sewage System</span>
              </span>
              <span className="font-semibold">{villageData.infrastructure.sewage}%</span>
            </div>
            <Progress value={villageData.infrastructure.sewage} className={getProgressColor(villageData.infrastructure.sewage)} />
          </div>
        </CardContent>
      </Card>

      {/* Road Infrastructure */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Road Infrastructure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Roads</span>
              <span className="font-semibold">{villageData.infrastructure.roads.total} km</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Paved Roads</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{villageData.infrastructure.roads.paved} km</span>
                  <Badge className="bg-green-100 text-green-700">
                    {Math.round((villageData.infrastructure.roads.paved / villageData.infrastructure.roads.total) * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(villageData.infrastructure.roads.paved / villageData.infrastructure.roads.total) * 100} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Unpaved Roads</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{villageData.infrastructure.roads.unpaved} km</span>
                  <Badge className="bg-orange-100 text-orange-700">
                    {Math.round((villageData.infrastructure.roads.unpaved / villageData.infrastructure.roads.total) * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(villageData.infrastructure.roads.unpaved / villageData.infrastructure.roads.total) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}