import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Building, 
  Search, 
  Filter, 
  Calendar,
  Users,
  CreditCard,
  GraduationCap,
  Heart,
  Home,
  Briefcase
} from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

export function GovernmentSchemes() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const schemeCategories = [
    { value: 'agriculture', label: 'Agriculture', icon: '🌾', count: 8 },
    { value: 'education', label: 'Education', icon: '🎓', count: 6 },
    { value: 'health', label: 'Health', icon: '🏥', count: 4 },
    { value: 'housing', label: 'Housing', icon: '🏠', count: 5 },
    { value: 'employment', label: 'Employment', icon: '💼', count: 7 },
    { value: 'social', label: 'Social Welfare', icon: '👥', count: 9 }
  ]

  const schemes = [
    {
      id: 'SCH001',
      title: 'PM Kisan Samman Nidhi',
      category: 'agriculture',
      description: 'Financial support of ₹6000 per year to small and marginal farmers',
      eligibility: 'Small and marginal farmers with landholding up to 2 hectares',
      benefits: '₹2000 every 4 months (₹6000 annually)',
      applicationProcess: 'Online application through PM Kisan portal',
      documents: ['Aadhaar Card', 'Bank Account Details', 'Land Records'],
      deadline: 'Year-round application',
      status: 'active',
      enrolledCount: 1250,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'SCH002',
      title: 'MNREGA',
      category: 'employment',
      description: 'Guaranteed 100 days of employment in rural areas',
      eligibility: 'Adult members of rural households',
      benefits: '₹200 per day for 100 days annually',
      applicationProcess: 'Apply at Gram Panchayat office',
      documents: ['Aadhaar Card', 'Bank Account', 'Address Proof'],
      deadline: 'Ongoing',
      status: 'active',
      enrolledCount: 890,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'SCH003',
      title: 'Pradhan Mantri Awas Yojana',
      category: 'housing',
      description: 'Financial assistance for construction of pucca houses',
      eligibility: 'Families without pucca house',
      benefits: '₹1.20 lakh for plain areas, ₹1.30 lakh for hilly areas',
      applicationProcess: 'Apply through Common Service Center or online',
      documents: ['Aadhaar Card', 'Income Certificate', 'Caste Certificate'],
      deadline: '31st March 2025',
      status: 'active',
      enrolledCount: 156,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'SCH004',
      title: 'Ayushman Bharat',
      category: 'health',
      description: 'Free health insurance coverage up to ₹5 lakh per family',
      eligibility: 'Families as per SECC 2011 database',
      benefits: 'Cashless treatment up to ₹5 lakh annually',
      applicationProcess: 'Automatic enrollment or apply at hospital',
      documents: ['Aadhaar Card', 'Ration Card'],
      deadline: 'Ongoing',
      status: 'active',
      enrolledCount: 2340,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'SCH005',
      title: 'Mid Day Meal Scheme',
      category: 'education',
      description: 'Free nutritious meals for school children',
      eligibility: 'Children studying in government and aided schools',
      benefits: 'Free lunch daily during school days',
      applicationProcess: 'Automatic enrollment through school',
      documents: ['School Enrollment'],
      deadline: 'Ongoing',
      status: 'active',
      enrolledCount: 567,
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ]

  const myApplications = [
    {
      id: 'APP001',
      schemeId: 'SCH001',
      schemeName: 'PM Kisan Samman Nidhi',
      appliedDate: '2025-01-15',
      status: 'approved',
      applicationNumber: 'PMK2025001234',
      lastUpdate: 'Application approved. First installment credited.'
    },
    {
      id: 'APP002',
      schemeId: 'SCH002',
      schemeName: 'MNREGA',
      appliedDate: '2025-01-10',
      status: 'in-review',
      applicationNumber: 'MNR2025005678',
      lastUpdate: 'Application under verification by district office.'
    }
  ]

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700'
      case 'in-review': return 'bg-yellow-100 text-yellow-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryIcon = (category) => {
    const categoryData = schemeCategories.find(cat => cat.value === category)
    return categoryData ? categoryData.icon : '📄'
  }

  const schemeStats = {
    total: schemes.length,
    applied: myApplications.length,
    approved: myApplications.filter(app => app.status === 'approved').length,
    active: schemes.filter(s => s.status === 'active').length
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{schemeStats.total}</div>
            <div className="text-xs text-muted-foreground">Available Schemes</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-green-600 mb-1">{schemeStats.active}</div>
            <div className="text-xs text-muted-foreground">Active Schemes</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{schemeStats.applied}</div>
            <div className="text-xs text-muted-foreground">Applied</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-orange-600 mb-1">{schemeStats.approved}</div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Scheme Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {schemeCategories.map(category => (
              <div 
                key={category.value}
                className="text-center p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedCategory(category.value)}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm mb-1">{category.label}</div>
                <Badge variant="secondary">{category.count} schemes</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search schemes..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {schemeCategories.map(cat => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Schemes ({filteredSchemes.length})</TabsTrigger>
          <TabsTrigger value="applications">My Applications ({myApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSchemes.map(scheme => (
              <Card key={scheme.id} className="card-shadow hover:card-shadow-hover transition-all">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-1/3">
                      <ImageWithFallback
                        src={scheme.image}
                        alt={scheme.title}
                        className="w-full h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getCategoryIcon(scheme.category)}</span>
                          <h3 className="font-semibold">{scheme.title}</h3>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {scheme.description}
                      </p>

                      <div className="space-y-2 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <CreditCard className="h-3 w-3" />
                          <span>Benefits: {scheme.benefits}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{scheme.enrolledCount} enrolled</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Deadline: {scheme.deadline}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">Apply Now</Button>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          {myApplications.map(application => (
            <Card key={application.id} className="card-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">{application.schemeName}</h4>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Application No: {application.applicationNumber}</p>
                      <p>Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
                      <p>Status: {application.lastUpdate}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Track Status</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}