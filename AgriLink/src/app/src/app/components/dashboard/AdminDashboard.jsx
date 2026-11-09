import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { 
  Users, 
  CreditCard, 
  MessageSquare, 
  Briefcase, 
  TrendingUp, 
  AlertCircle,
  Plus,
  Upload,
  Send,
  Settings,
  FileText,
  Calendar,
  Activity
} from 'lucide-react'

export function AdminDashboard() {
  const stats = [
    {
      title: 'Total Villagers',
      value: '1,247',
      change: '+12',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Tax Collection',
      value: '₹45.2L',
      change: '+8.2%',
      changeType: 'increase',
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Active Grievances',
      value: '23',
      change: '-5',
      changeType: 'decrease',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Job Applications',
      value: '156',
      change: '+23',
      changeType: 'increase',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const taxData = [
    { month: 'Jan', house: 120000, water: 45000 },
    { month: 'Feb', house: 135000, water: 48000 },
    { month: 'Mar', house: 128000, water: 46000 },
    { month: 'Apr', house: 142000, water: 52000 },
    { month: 'May', house: 138000, water: 49000 },
    { month: 'Jun', house: 145000, water: 51000 }
  ]

  const grievanceData = [
    { name: 'Water Supply', value: 8, color: '#3b82f6' },
    { name: 'Road Repair', value: 6, color: '#10b981' },
    { name: 'Electricity', value: 4, color: '#f59e0b' },
    { name: 'Street Lights', value: 3, color: '#ef4444' },
    { name: 'Others', value: 2, color: '#8b5cf6' }
  ]

  const userEngagementData = [
    { day: 'Mon', users: 245 },
    { day: 'Tue', users: 312 },
    { day: 'Wed', users: 289 },
    { day: 'Thu', users: 367 },
    { day: 'Fri', users: 423 },
    { day: 'Sat', users: 378 },
    { day: 'Sun', users: 298 }
  ]

  const quickActions = [
    {
      title: 'Post Event',
      description: 'Add new village event',
      icon: Calendar,
      action: 'Create Event',
      color: 'bg-blue-500'
    },
    {
      title: 'Upload Document',
      description: 'Add new forms/documents',
      icon: Upload,
      action: 'Upload',
      color: 'bg-green-500'
    },
    {
      title: 'Send Notification',
      description: 'Push alert to villagers',
      icon: Send,
      action: 'Send',
      color: 'bg-purple-500'
    },
    {
      title: 'Manage Users',
      description: 'View/edit user accounts',
      icon: Users,
      action: 'Manage',
      color: 'bg-orange-500'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      user: 'Ramesh Kumar',
      action: 'Paid house tax',
      amount: '₹1,200',
      time: '2 hours ago'
    },
    {
      id: 2,
      user: 'Sita Devi',
      action: 'Filed grievance',
      description: 'Water supply issue',
      time: '4 hours ago'
    },
    {
      id: 3,
      user: 'Admin',
      action: 'Posted event',
      description: 'Republic Day celebration',
      time: '6 hours ago'
    },
    {
      id: 4,
      user: 'Mohan Patil',
      action: 'Applied for job',
      description: 'Farm worker position',
      time: '8 hours ago'
    }
  ]

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-semibold mb-2">Admin Dashboard</h2>
        <p className="text-green-100">
          Shivapur Village Management • Today, 21 Jan 2025
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <Badge 
                  variant={stat.changeType === 'increase' ? 'default' : 'secondary'}
                  className={stat.changeType === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                >
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto flex flex-col items-center p-4 space-y-2"
              >
                <div className={`p-3 rounded-lg ${action.color} text-white`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tax Collection */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Tax Collection Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={taxData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value / 1000).toFixed(0)}K`, '']} />
                <Bar dataKey="house" fill="#10b981" name="House Tax" />
                <Bar dataKey="water" fill="#3b82f6" name="Water Tax" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grievance Distribution */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Grievance Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={grievanceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {grievanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Engagement */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Daily User Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={userEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="card-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activities</CardTitle>
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{activity.user}</span>
                    <span className="text-sm text-muted-foreground">{activity.action}</span>
                  </div>
                  {activity.amount && (
                    <div className="text-sm text-green-600 font-semibold">{activity.amount}</div>
                  )}
                  {activity.description && (
                    <div className="text-xs text-muted-foreground">{activity.description}</div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}