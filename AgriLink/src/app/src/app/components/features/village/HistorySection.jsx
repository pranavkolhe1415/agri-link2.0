import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { History, Award, Calendar } from 'lucide-react'
import { history, achievements } from '../data/villageData'

export function HistorySection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Village History */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Village History</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Founding</h4>
            <p className="text-sm text-muted-foreground">{history.founding}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Significance</h4>
            <p className="text-sm text-muted-foreground">{history.significance}</p>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Achievements & Recognition</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{achievement.title}</h4>
                <Badge variant="outline">{achievement.year}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
              <p className="text-xs text-primary">- {achievement.authority}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Historical Timeline */}
      <Card className="card-shadow md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Historical Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-primary rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline">{milestone.year}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}