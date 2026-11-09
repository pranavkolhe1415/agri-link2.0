import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  MessageSquare, 
  Plus, 
  Upload, 
  FileText,
  Camera,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Calendar,
  Filter,
  Search,
  Paperclip,
  X
} from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { toast } from 'sonner@2.0.3'

export function GrievanceSystem() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [newGrievance, setNewGrievance] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    priority: 'medium',
    attachments: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedGrievance, setSelectedGrievance] = useState(null)

  const categories = [
    { value: 'water', label: 'Water Supply', icon: '💧' },
    { value: 'electricity', label: 'Electricity', icon: '⚡' },
    { value: 'roads', label: 'Roads & Infrastructure', icon: '🛣️' },
    { value: 'sanitation', label: 'Sanitation', icon: '🧹' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'education', label: 'Education', icon: '🎓' },
    { value: 'agriculture', label: 'Agriculture', icon: '🌾' },
    { value: 'others', label: 'Others', icon: '📝' }
  ]

  const grievances = [
    {
      id: 'GRV001',
      title: 'Street Light Not Working',
      category: 'electricity',
      description: 'The street light near the village temple has been non-functional for the past week, causing inconvenience during evening hours.',
      location: 'Temple Road, Ward 3',
      priority: 'high',
      status: 'in-progress',
      submittedBy: 'Ramesh Kumar',
      submittedAt: '2025-01-18T10:30:00Z',
      assignedTo: 'Electrical Department',
      expectedResolution: '2025-01-25',
      attachments: ['street_light_photo.jpg'],
      updates: [
        { date: '2025-01-19', message: 'Complaint registered and forwarded to electrical department', by: 'Admin' },
        { date: '2025-01-20', message: 'Site inspection completed. Replacement required.', by: 'Electrician' }
      ]
    },
    {
      id: 'GRV002',
      title: 'Water Supply Shortage',
      category: 'water',
      description: 'Our area has been experiencing water shortage for the past 3 days. The morning supply is irregular.',
      location: 'Shivaji Nagar, Ward 1',
      priority: 'high',
      status: 'pending',
      submittedBy: 'Sita Devi',
      submittedAt: '2025-01-19T14:15:00Z',
      assignedTo: null,
      expectedResolution: null,
      attachments: [],
      updates: [
        { date: '2025-01-19', message: 'Complaint received and under review', by: 'Admin' }
      ]
    },
    {
      id: 'GRV003',
      title: 'Pothole on Main Road',
      category: 'roads',
      description: 'Large pothole developed on the main road causing difficulty for vehicles and pedestrians.',
      location: 'Main Road, near Post Office',
      priority: 'medium',
      status: 'resolved',
      submittedBy: 'Mohan Patil',
      submittedAt: '2025-01-15T09:20:00Z',
      assignedTo: 'Public Works Department',
      expectedResolution: '2025-01-22',
      resolvedAt: '2025-01-21T16:00:00Z',
      attachments: ['pothole_before.jpg', 'pothole_after.jpg'],
      updates: [
        { date: '2025-01-16', message: 'Work order issued for road repair', by: 'PWD Officer' },
        { date: '2025-01-21', message: 'Pothole filled and road repaired successfully', by: 'PWD Officer' }
      ]
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'resolved': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }))
    
    setNewGrievance(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }))
  }

  const removeAttachment = (index) => {
    setNewGrievance(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmitGrievance = async () => {
    if (!newGrievance.category || !newGrievance.title || !newGrievance.description) {
      toast.error('Please fill all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Grievance submitted successfully!')
      
      // Reset form
      setNewGrievance({
        category: '',
        title: '',
        description: '',
        location: '',
        priority: 'medium',
        attachments: []
      })
    } catch (error) {
      toast.error('Failed to submit grievance. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const stats = {
    total: grievances.length,
    pending: grievances.filter(g => g.status === 'pending').length,
    inProgress: grievances.filter(g => g.status === 'in-progress').length,
    resolved: grievances.filter(g => g.status === 'resolved').length
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Grievances</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-orange-600 mb-1">{stats.pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{stats.inProgress}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-green-600 mb-1">{stats.resolved}</div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* File New Grievance Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Grievances</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>File New Grievance</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>File New Grievance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select 
                    value={newGrievance.category} 
                    onValueChange={(value) => setNewGrievance(prev => ({...prev, category: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <span className="flex items-center space-x-2">
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select 
                    value={newGrievance.priority} 
                    onValueChange={(value) => setNewGrievance(prev => ({...prev, priority: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  placeholder="Brief title of your grievance"
                  value={newGrievance.title}
                  onChange={(e) => setNewGrievance(prev => ({...prev, title: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Specific location (e.g., Ward 2, Main Road)"
                  value={newGrievance.location}
                  onChange={(e) => setNewGrievance(prev => ({...prev, location: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="Detailed description of your grievance..."
                  value={newGrievance.description}
                  onChange={(e) => setNewGrievance(prev => ({...prev, description: e.target.value}))}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload photos or documents</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Camera className="h-4 w-4 mr-2" />
                        Choose Files
                      </label>
                    </Button>
                  </div>
                </div>
                
                {newGrievance.attachments.length > 0 && (
                  <div className="space-y-2">
                    {newGrievance.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center space-x-2">
                          <Paperclip className="h-4 w-4" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button 
                onClick={handleSubmitGrievance}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grievances List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({stats.inProgress})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({stats.resolved})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {grievances.map(grievance => (
            <GrievanceCard 
              key={grievance.id} 
              grievance={grievance} 
              onView={setSelectedGrievance}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {grievances.filter(g => g.status === 'pending').map(grievance => (
            <GrievanceCard 
              key={grievance.id} 
              grievance={grievance} 
              onView={setSelectedGrievance}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {grievances.filter(g => g.status === 'in-progress').map(grievance => (
            <GrievanceCard 
              key={grievance.id} 
              grievance={grievance} 
              onView={setSelectedGrievance}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {grievances.filter(g => g.status === 'resolved').map(grievance => (
            <GrievanceCard 
              key={grievance.id} 
              grievance={grievance} 
              onView={setSelectedGrievance}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* Grievance Detail Modal */}
      {selectedGrievance && (
        <Dialog open={!!selectedGrievance} onOpenChange={() => setSelectedGrievance(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedGrievance.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(selectedGrievance.status)}>
                  {selectedGrievance.status}
                </Badge>
                <Badge className={getPriorityColor(selectedGrievance.priority)}>
                  {selectedGrievance.priority} priority
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Grievance ID:</span> {selectedGrievance.id}
                </div>
                <div>
                  <span className="font-medium">Category:</span> {
                    categories.find(c => c.value === selectedGrievance.category)?.label
                  }
                </div>
                <div>
                  <span className="font-medium">Location:</span> {selectedGrievance.location}
                </div>
                <div>
                  <span className="font-medium">Submitted:</span> {
                    new Date(selectedGrievance.submittedAt).toLocaleDateString()
                  }
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-gray-600">{selectedGrievance.description}</p>
              </div>

              {selectedGrievance.attachments && selectedGrievance.attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Attachments</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedGrievance.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Updates</h4>
                <div className="space-y-3">
                  {selectedGrievance.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded">
                      <div className="bg-primary/10 p-1 rounded-full">
                        <Clock className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{update.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(update.date).toLocaleDateString()} • by {update.by}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function GrievanceCard({ grievance, onView, getStatusColor, getPriorityColor }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return AlertCircle
      case 'in-progress': return Clock
      case 'resolved': return CheckCircle
      default: return MessageSquare
    }
  }

  const StatusIcon = getStatusIcon(grievance.status)

  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all cursor-pointer" onClick={() => onView(grievance)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <StatusIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{grievance.title}</h4>
              <p className="text-sm text-muted-foreground">#{grievance.id}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge className={getStatusColor(grievance.status)}>
              {grievance.status}
            </Badge>
            <Badge variant="outline" className={getPriorityColor(grievance.priority)}>
              {grievance.priority}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{grievance.description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{grievance.location}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(grievance.submittedAt).toLocaleDateString()}</span>
            </span>
          </div>
          {grievance.attachments && grievance.attachments.length > 0 && (
            <span className="flex items-center space-x-1">
              <Paperclip className="h-3 w-3" />
              <span>{grievance.attachments.length}</span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}