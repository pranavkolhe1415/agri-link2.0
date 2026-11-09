import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  Zap, 
  Droplets, 
  Wifi, 
  Phone,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  Bell
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

export function UtilityServices() {
  const [selectedService, setSelectedService] = useState(null)

  const utilities = [
    {
      id: 'electricity',
      name: 'Electricity',
      icon: Zap,
      status: 'operational',
      coverage: 98.5,
      provider: 'Maharashtra State Electricity Board',
      contact: '+91-1912-2345678',
      emergencyContact: '1912',
      lastOutage: '2025-01-18',
      avgDowntime: '2.3 hours/month',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 'water',
      name: 'Water Supply',
      icon: Droplets,
      status: 'operational',
      coverage: 95.2,
      provider: 'Rural Water Supply Department',
      contact: '+91-20-12345679',
      emergencyContact: '1916',
      lastOutage: '2025-01-20',
      avgDowntime: '4.1 hours/month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'internet',
      name: 'Internet & Telecom',
      icon: Wifi,
      status: 'maintenance',
      coverage: 67.8,
      provider: 'Bharti Airtel & Jio',
      contact: '+91-121-2345680',
      emergencyContact: '198',
      lastOutage: '2025-01-21',
      avgDowntime: '6.7 hours/month',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const serviceAlerts = [
    {
      id: 'ALERT001',
      service: 'water',
      title: 'Scheduled Maintenance',
      message: 'Water supply will be interrupted on 25th Jan from 10 AM to 2 PM for pipeline maintenance',
      type: 'info',
      date: '2025-01-23',
      duration: '4 hours',
      affectedAreas: ['Ward 1', 'Ward 2']
    },
    {
      id: 'ALERT002',
      service: 'electricity',
      title: 'Power Restoration Complete',
      message: 'Power has been restored to all areas after transformer repair',
      type: 'success',
      date: '2025-01-21',
      duration: '2 hours',
      affectedAreas: ['Ward 3']
    },
    {
      id: 'ALERT003',
      service: 'internet',
      title: 'Network Optimization',
      message: 'Internet services under maintenance for network upgrades',
      type: 'warning',
      date: '2025-01-21',
      duration: 'Ongoing',
      affectedAreas: ['All Areas']
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return CheckCircle
      case 'maintenance': return Clock
      case 'outage': return AlertCircle
      default: return Clock
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700'
      case 'maintenance': return 'bg-yellow-100 text-yellow-700'
      case 'outage': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'info': return <Bell className="h-4 w-4 text-blue-600" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const reportIssue = (serviceId) => {
    toast.success(`Issue reported for ${utilities.find(u => u.id === serviceId)?.name}. Reference ID: ${Date.now()}`)
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Service Status Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        {utilities.map(utility => {
          const StatusIcon = getStatusIcon(utility.status)
          return (
            <Card key={utility.id} className="card-shadow hover:card-shadow-hover transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${utility.bgColor}`}>
                      <utility.icon className={`h-6 w-6 ${utility.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{utility.name}</h3>
                      <p className="text-sm text-muted-foreground">{utility.provider}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(utility.status)}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {utility.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Coverage</span>
                      <span>{utility.coverage}%</span>
                    </div>
                    <Progress value={utility.coverage} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div>
                      <span>Last Outage</span>
                      <p className="font-medium text-foreground">{new Date(utility.lastOutage).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span>Avg Downtime</span>
                      <p className="font-medium text-foreground">{utility.avgDowntime}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="h-3 w-3 mr-1" />
                      Call: {utility.emergencyContact}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => reportIssue(utility.id)}
                    >
                      Report Issue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Service Alerts and Information */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Service Alerts ({serviceAlerts.length})</TabsTrigger>
          <TabsTrigger value="schedules">Maintenance Schedules</TabsTrigger>
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {serviceAlerts.map(alert => (
            <Card key={alert.id} className="card-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    {getAlertTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {utilities.find(u => u.id === alert.service)?.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(alert.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Duration: {alert.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>Areas: {alert.affectedAreas.join(', ')}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Water Pipeline Cleaning</p>
                      <p className="text-sm text-muted-foreground">Ward 1 & 2 main supply lines</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">25 Jan 2025</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 2:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Transformer Maintenance</p>
                      <p className="text-sm text-muted-foreground">Village transformer station</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">28 Jan 2025</p>
                    <p className="text-sm text-muted-foreground">6:00 AM - 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Wifi className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Network Tower Upgrade</p>
                      <p className="text-sm text-muted-foreground">4G to 5G infrastructure upgrade</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">30 Jan 2025</p>
                    <p className="text-sm text-muted-foreground">All day</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {utilities.map(utility => (
              <Card key={utility.id} className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <utility.icon className={`h-5 w-5 ${utility.color}`} />
                    <span>{utility.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Service Provider</p>
                    <p className="font-medium">{utility.provider}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Service</p>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <p className="font-medium">{utility.contact}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Emergency Helpline</p>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <p className="font-medium text-red-600">{utility.emergencyContact}</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Emergency: {utility.emergencyContact}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}