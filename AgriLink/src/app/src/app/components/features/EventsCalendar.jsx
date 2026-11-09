import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Calendar } from '../ui/calendar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar as CalendarIcon, 
  Plus, 
  MapPin, 
  Clock,
  Users,
  Star,
  Filter,
  Search,
  Bell,
  Share2,
  Heart,
  Camera,
  Music,
  Utensils,
  Trophy,
  BookOpen,
  Activity
} from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { toast } from 'sonner@2.0.3'

export function EventsCalendar() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    capacity: '',
    isPublic: true
  })
  const [isCreating, setIsCreating] = useState(false)

  const eventCategories = [
    { value: 'cultural', label: 'Cultural', icon: Music, color: 'bg-purple-100 text-purple-700' },
    { value: 'religious', label: 'Religious', icon: Star, color: 'bg-orange-100 text-orange-700' },
    { value: 'sports', label: 'Sports', icon: Trophy, color: 'bg-blue-100 text-blue-700' },
    { value: 'education', label: 'Educational', icon: BookOpen, color: 'bg-green-100 text-green-700' },
    { value: 'health', label: 'Health', icon: Activity, color: 'bg-red-100 text-red-700' },
    { value: 'social', label: 'Social', icon: Users, color: 'bg-indigo-100 text-indigo-700' },
    { value: 'festival', label: 'Festival', icon: Camera, color: 'bg-pink-100 text-pink-700' },
    { value: 'food', label: 'Food', icon: Utensils, color: 'bg-yellow-100 text-yellow-700' }
  ]

  const events = [
    {
      id: 'EVT001',
      title: 'Republic Day Celebration',
      description: 'Grand celebration of Republic Day with flag hoisting, cultural programs, and community feast.',
      date: '2025-01-26',
      time: '08:00',
      endTime: '12:00',
      location: 'Village Ground',
      category: 'festival',
      organizer: 'Grampanchayat',
      capacity: 500,
      registered: 234,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublic: true,
      status: 'upcoming',
      tags: ['National', 'Cultural', 'Community'],
      highlights: [
        'Flag hoisting ceremony at 8 AM',
        'Cultural performances by local artists',
        'Community lunch at 11 AM',
        'Sports competitions for children'
      ]
    },
    {
      id: 'EVT002',
      title: 'Farmers Training Workshop',
      description: 'Training session on modern farming techniques and government schemes for farmers.',
      date: '2025-01-28',
      time: '10:00',
      endTime: '16:00',
      location: 'Community Hall',
      category: 'education',
      organizer: 'Agriculture Department',
      capacity: 100,
      registered: 67,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublic: true,
      status: 'upcoming',
      tags: ['Education', 'Agriculture', 'Training'],
      highlights: [
        'Organic farming techniques',
        'Government subsidies information',
        'Q&A session with experts',
        'Free lunch and materials'
      ]
    },
    {
      id: 'EVT003',
      title: 'Health Camp',
      description: 'Free health checkup camp with doctors from district hospital.',
      date: '2025-01-30',
      time: '09:00',
      endTime: '17:00',
      location: 'Primary Health Centre',
      category: 'health',
      organizer: 'Health Department',
      capacity: 200,
      registered: 156,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublic: true,
      status: 'upcoming',
      tags: ['Health', 'Medical', 'Free'],
      highlights: [
        'General health checkup',
        'Blood pressure & diabetes screening',
        'Eye checkup',
        'Free medicines'
      ]
    },
    {
      id: 'EVT004',
      title: 'Makar Sankranti Festival',
      description: 'Traditional kite flying festival with cultural programs and local food stalls.',
      date: '2025-01-14',
      time: '06:00',
      endTime: '18:00',
      location: 'Village Ground',
      category: 'festival',
      organizer: 'Cultural Committee',
      capacity: 1000,
      registered: 678,
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublic: true,
      status: 'completed',
      tags: ['Festival', 'Traditional', 'Cultural'],
      highlights: [
        'Kite flying competition',
        'Traditional food stalls',
        'Folk dance performances',
        'Prize distribution'
      ]
    }
  ]

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date() && event.status === 'upcoming')
  const pastEvents = events.filter(event => event.status === 'completed')

  const getCategoryInfo = (categoryValue) => {
    return eventCategories.find(cat => cat.value === categoryValue) || eventCategories[0]
  }

  const getEventDatesWithEvents = () => {
    const datesWithEvents = new Set()
    events.forEach(event => {
      datesWithEvents.add(event.date)
    })
    return datesWithEvents
  }

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateString)
  }

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      toast.error('Please fill all required fields')
      return
    }

    setIsCreating(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Event created successfully!')
      
      // Reset form
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: '',
        capacity: '',
        isPublic: true
      })
    } catch (error) {
      toast.error('Failed to create event. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleRegisterForEvent = async (event) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`Successfully registered for ${event.title}!`)
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    }
  }

  const eventStats = {
    total: events.length,
    upcoming: upcomingEvents.length,
    registered: events.reduce((sum, event) => sum + (event.registered || 0), 0),
    thisMonth: events.filter(event => {
      const eventDate = new Date(event.date)
      const now = new Date()
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear()
    }).length
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{eventStats.total}</div>
            <div className="text-xs text-muted-foreground">Total Events</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-green-600 mb-1">{eventStats.upcoming}</div>
            <div className="text-xs text-muted-foreground">Upcoming</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{eventStats.registered}</div>
            <div className="text-xs text-muted-foreground">Registrations</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-orange-600 mb-1">{eventStats.thisMonth}</div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </CardContent>
        </Card>
      </div>

      {/* Create Event Button (Admin Only) */}
      {user?.role === 'admin' && (
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Event</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Event Title *</Label>
                    <Input
                      placeholder="Enter event title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({...prev, title: e.target.value}))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select 
                      value={newEvent.category} 
                      onValueChange={(value) => setNewEvent(prev => ({...prev, category: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventCategories.map(cat => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <span className="flex items-center space-x-2">
                              <cat.icon className="h-4 w-4" />
                              <span>{cat.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    placeholder="Event description..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({...prev, description: e.target.value}))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({...prev, date: e.target.value}))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Start Time *</Label>
                    <Input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({...prev, time: e.target.value}))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input
                      type="number"
                      placeholder="Max attendees"
                      value={newEvent.capacity}
                      onChange={(e) => setNewEvent(prev => ({...prev, capacity: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location *</Label>
                  <Input
                    placeholder="Event location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({...prev, location: e.target.value}))}
                  />
                </div>

                <Button 
                  onClick={handleCreateEvent}
                  disabled={isCreating}
                  className="w-full"
                >
                  {isCreating ? 'Creating Event...' : 'Create Event'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Event Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEvents: (date) => getEventDatesWithEvents().has(date.toISOString().split('T')[0])
              }}
              modifiersStyles={{
                hasEvents: { 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'white',
                  fontWeight: 'bold'
                }
              }}
            />
            
            {/* Events for Selected Date */}
            {selectedDate && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">
                  Events on {selectedDate.toLocaleDateString()}
                </h4>
                <div className="space-y-2">
                  {getEventsForDate(selectedDate).map(event => {
                    const categoryInfo = getCategoryInfo(event.category)
                    return (
                      <div key={event.id} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                        <categoryInfo.icon className="h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    )
                  })}
                  {getEventsForDate(selectedDate).length === 0 && (
                    <p className="text-sm text-muted-foreground">No events on this date</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Events ({upcomingEvents.length})</TabsTrigger>
              <TabsTrigger value="past">Past Events ({pastEvents.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  categoryInfo={getCategoryInfo(event.category)}
                  onRegister={handleRegisterForEvent}
                  showRegister={true}
                />
              ))}
              {upcomingEvents.length === 0 && (
                <Card className="card-shadow">
                  <CardContent className="p-8 text-center">
                    <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No upcoming events</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  categoryInfo={getCategoryInfo(event.category)}
                  onRegister={handleRegisterForEvent}
                  showRegister={false}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function EventCard({ event, categoryInfo, onRegister, showRegister }) {
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = async () => {
    setIsRegistering(true)
    await onRegister(event)
    setIsRegistering(false)
  }

  const occupancyPercentage = event.capacity ? (event.registered / event.capacity) * 100 : 0

  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Event Image */}
          <div className="md:w-1/3">
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-full h-48 md:h-full object-cover rounded-l-lg"
            />
          </div>
          
          {/* Event Details */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Badge className={categoryInfo.color}>
                  <categoryInfo.icon className="h-3 w-3 mr-1" />
                  {categoryInfo.label}
                </Badge>
                {event.status === 'completed' && (
                  <Badge variant="outline">Completed</Badge>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{event.time} - {event.endTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{event.registered} / {event.capacity || '∞'} registered</span>
              </div>
            </div>

            {/* Occupancy Bar */}
            {event.capacity && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Registration</span>
                  <span>{Math.round(occupancyPercentage)}% full</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Event Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">Event Highlights:</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {event.highlights.slice(0, 2).map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {event.tags && event.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {showRegister && (
                <Button 
                  onClick={handleRegister}
                  disabled={isRegistering || (event.capacity && event.registered >= event.capacity)}
                  className="flex-1"
                >
                  {isRegistering ? 'Registering...' : 
                   event.capacity && event.registered >= event.capacity ? 'Full' : 'Register'}
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Remind Me
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}