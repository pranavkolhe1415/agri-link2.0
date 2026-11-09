import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Bell, 
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Droplets,
  Zap
} from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

export function VillagerDashboard() {
  const { t } = useLanguage()
  const { user } = useAuth()

  const quickActions = [
    {
      id: 'pay-tax',
      title: 'Pay House Tax',
      subtitle: '₹1,200 Due',
      icon: CreditCard,
      color: 'bg-red-100 text-red-600',
      action: 'Pay Now'
    },
    {
      id: 'water-bill',
      title: 'Water Bill',
      subtitle: '₹320 Due',
      icon: Droplets,
      color: 'bg-blue-100 text-blue-600',
      action: 'Pay Now'
    },
    {
      id: 'electricity',
      title: 'Electricity',
      subtitle: 'Bill Paid',
      icon: Zap,
      color: 'bg-green-100 text-green-600',
      action: 'View'
    },
    {
      id: 'grievance',
      title: 'File Grievance',
      subtitle: 'Report Issues',
      icon: MessageSquare,
      color: 'bg-orange-100 text-orange-600',
      action: 'File'
    },
    {
      id: 'jobs',
      title: 'Job Opportunities',
      subtitle: '5 New Jobs',
      icon: Briefcase,
      color: 'bg-purple-100 text-purple-600',
      action: 'Browse'
    },
    {
      id: 'documents',
      title: 'Documents',
      subtitle: 'Download Forms',
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-600',
      action: 'View'
    }
  ]

  const notifications = [
    {
      id: 1,
      title: 'House Tax Due',
      message: 'Your house tax payment of ₹1,200 is due on 25th Jan',
      type: 'warning',
      time: '2 hours ago',
      icon: AlertCircle
    },
    {
      id: 2,
      title: 'New Government Scheme',
      message: 'PM Kisan Samman Nidhi - Apply now for benefits',
      type: 'info',
      time: '1 day ago',
      icon: TrendingUp
    },
    {
      id: 3,
      title: 'Water Supply Notice',
      message: 'Water supply will be disrupted on 23rd Jan from 10 AM to 2 PM',
      type: 'info',
      time: '2 days ago',
      icon: Droplets
    },
    {
      id: 4,
      title: 'Grievance Resolved',
      message: 'Your street light complaint has been resolved',
      type: 'success',
      time: '3 days ago',
      icon: CheckCircle
    }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'Electricity Bill Paid',
      amount: '₹850',
      date: '18 Jan 2025',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Grievance Filed',
      description: 'Street light not working',
      date: '15 Jan 2025',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Job Application',
      description: 'Applied for farm worker position',
      date: '12 Jan 2025',
      status: 'pending'
    }
  ]

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-2">
            {t('dashboard.welcome')}, {user?.name}! 🙏
          </h2>
          <p className="text-green-100 mb-4">
            Welcome to digital governance for {user?.village} village
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{user?.village} Village</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Monday, 21 Jan 2025</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Village background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('dashboard.quick_actions')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Card key={action.id} className="card-shadow hover:card-shadow-hover transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-medium mb-1">{action.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{action.subtitle}</p>
                <Button size="sm" variant="outline" className="text-xs">
                  {action.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Two Column Layout for Desktop */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>{t('dashboard.notifications')}</span>
            </CardTitle>
            <Badge variant="secondary">4</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className={`p-2 rounded-full ${
                  notification.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                  notification.type === 'success' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <notification.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              {t('common.view_all')}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>{t('dashboard.recent_activities')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  {activity.amount && (
                    <p className="text-sm text-green-600 font-semibold">{activity.amount}</p>
                  )}
                  {activity.description && (
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <Badge 
                  variant={
                    activity.status === 'completed' ? 'default' :
                    activity.status === 'in-progress' ? 'secondary' :
                    'outline'
                  }
                  className={
                    activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                    activity.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }
                >
                  {activity.status === 'completed' ? 'Completed' :
                   activity.status === 'in-progress' ? 'In Progress' :
                   'Pending'}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              {t('common.view_all')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-green-600 mb-1">₹2,170</div>
            <div className="text-xs text-muted-foreground">Pending Bills</div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-blue-600 mb-1">2</div>
            <div className="text-xs text-muted-foreground">Active Grievances</div>
            <Progress value={40} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-purple-600 mb-1">5</div>
            <div className="text-xs text-muted-foreground">Job Applications</div>
            <Progress value={80} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-orange-600 mb-1">3</div>
            <div className="text-xs text-muted-foreground">Upcoming Events</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}