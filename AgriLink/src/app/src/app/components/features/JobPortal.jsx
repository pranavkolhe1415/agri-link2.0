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
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock,
  Rupee,
  Users,
  GraduationCap,
  Building,
  Filter,
  Search,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { toast } from 'sonner@2.0.3'

export function JobPortal() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [selectedJob, setSelectedJob] = useState(null)
  const [applicationData, setApplicationData] = useState({
    resume: null,
    coverLetter: '',
    experience: '',
    skills: ''
  })
  const [isApplying, setIsApplying] = useState(false)

  const jobs = [
    {
      id: 'JOB001',
      title: 'Farm Worker',
      type: 'local',
      company: 'Shivapur Cooperative Farm',
      location: 'Shivapur Village',
      salary: '₹250-300/day',
      experience: 'No experience required',
      education: 'Primary education',
      description: 'Looking for dedicated workers for seasonal farming activities including planting, harvesting, and general farm maintenance.',
      requirements: [
        'Physical fitness for outdoor work',
        'Willingness to work in all weather conditions',
        'Basic knowledge of farming practices preferred'
      ],
      benefits: [
        'Daily wages payment',
        'Lunch provided',
        'Seasonal bonus',
        'Health insurance after 6 months'
      ],
      postedBy: 'Ram Kisan Cooperative',
      postedDate: '2025-01-20',
      applicationDeadline: '2025-01-30',
      vacancies: 15,
      appliedCount: 23,
      status: 'active'
    },
    {
      id: 'JOB002',
      title: 'MNREGA Worker',
      type: 'government',
      company: 'Ministry of Rural Development',
      location: 'Multiple Locations',
      salary: '₹200/day (guaranteed)',
      experience: 'Not required',
      education: 'No formal education required',
      description: 'Government employment guarantee scheme providing 100 days of guaranteed employment in rural areas.',
      requirements: [
        'Must be resident of rural area',
        'Age between 18-60 years',
        'Valid Aadhaar card',
        'Job card registration'
      ],
      benefits: [
        '100 days guaranteed employment',
        'Unemployment allowance if work not provided',
        'Maternity benefit',
        'Medical assistance'
      ],
      postedBy: 'District Collector Office',
      postedDate: '2025-01-18',
      applicationDeadline: 'Ongoing',
      vacancies: 100,
      appliedCount: 156,
      status: 'active'
    },
    {
      id: 'JOB003',
      title: 'Village Health Worker',
      type: 'government',
      company: 'National Health Mission',
      location: 'Shivapur & nearby villages',
      salary: '₹8,000-12,000/month',
      experience: '1-2 years in healthcare',
      education: '12th pass with healthcare diploma',
      description: 'Community health worker to provide basic healthcare services and health education in rural areas.',
      requirements: [
        '12th standard with science subjects',
        'Diploma in nursing/healthcare',
        'Basic computer knowledge',
        'Local language proficiency'
      ],
      benefits: [
        'Monthly salary',
        'Medical benefits',
        'Training provided',
        'Career advancement opportunities'
      ],
      postedBy: 'Primary Health Centre',
      postedDate: '2025-01-15',
      applicationDeadline: '2025-02-15',
      vacancies: 2,
      appliedCount: 8,
      status: 'active'
    },
    {
      id: 'JOB004',
      title: 'Dairy Farm Assistant',
      type: 'local',
      company: 'Shivapur Dairy Cooperative',
      location: 'Shivapur Village',
      salary: '₹10,000-15,000/month',
      experience: '6 months in dairy/animal care',
      education: '10th pass',
      description: 'Assistant required for dairy farm operations including animal care, milk collection, and basic veterinary support.',
      requirements: [
        'Experience with cattle care',
        'Knowledge of milking procedures',
        'Basic understanding of animal health',
        'Physical fitness for daily farm work'
      ],
      benefits: [
        'Fixed monthly salary',
        'Free meals during work hours',
        'Festival bonus',
        'Skill development training'
      ],
      postedBy: 'Dairy Cooperative Society',
      postedDate: '2025-01-12',
      applicationDeadline: '2025-01-25',
      vacancies: 3,
      appliedCount: 12,
      status: 'active'
    }
  ]

  const myApplications = [
    {
      id: 'APP001',
      jobId: 'JOB001',
      jobTitle: 'Farm Worker',
      company: 'Shivapur Cooperative Farm',
      appliedDate: '2025-01-19',
      status: 'under-review',
      statusMessage: 'Your application is being reviewed by the employer'
    },
    {
      id: 'APP002',
      jobId: 'JOB004',
      jobTitle: 'Dairy Farm Assistant',
      company: 'Shivapur Dairy Cooperative',
      appliedDate: '2025-01-16',
      status: 'shortlisted',
      statusMessage: 'Congratulations! You have been shortlisted for interview'
    },
    {
      id: 'APP003',
      jobId: 'JOB003',
      jobTitle: 'Village Health Worker',
      company: 'National Health Mission',
      appliedDate: '2025-01-14',
      status: 'rejected',
      statusMessage: 'Unfortunately, your application was not selected'
    }
  ]

  const getJobTypeColor = (type) => {
    return type === 'government' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
  }

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'under-review': return 'bg-yellow-100 text-yellow-700'
      case 'shortlisted': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      case 'selected': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setApplicationData(prev => ({
        ...prev,
        resume: {
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file)
        }
      }))
    }
  }

  const handleJobApplication = async (job) => {
    if (!applicationData.resume) {
      toast.error('Please upload your resume')
      return
    }

    setIsApplying(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Application submitted successfully!')
      
      // Reset form
      setApplicationData({
        resume: null,
        coverLetter: '',
        experience: '',
        skills: ''
      })
      
      setSelectedJob(null)
    } catch (error) {
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsApplying(false)
    }
  }

  const jobStats = {
    total: jobs.length,
    local: jobs.filter(j => j.type === 'local').length,
    government: jobs.filter(j => j.type === 'government').length,
    applied: myApplications.length
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{jobStats.total}</div>
            <div className="text-xs text-muted-foreground">Available Jobs</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-green-600 mb-1">{jobStats.local}</div>
            <div className="text-xs text-muted-foreground">Local Jobs</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{jobStats.government}</div>
            <div className="text-xs text-muted-foreground">Govt Jobs</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-orange-600 mb-1">{jobStats.applied}</div>
            <div className="text-xs text-muted-foreground">Applied</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="card-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search jobs..." className="pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Tabs */}
      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications ({myApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {jobs.map(job => (
            <Card key={job.id} className="card-shadow hover:card-shadow-hover transition-all">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <Badge className={getJobTypeColor(job.type)}>
                          {job.type === 'government' ? 'Government' : 'Local'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Rupee className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{job.vacancies} positions</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {job.applicationDeadline}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedJob(job)}>
                          Apply Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Apply for {job.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Job Details */}
                          <div className="space-y-4">
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">{job.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Location:</span>
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Salary:</span>
                                  <span>{job.salary}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Experience:</span>
                                  <span>{job.experience}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Education:</span>
                                  <span>{job.education}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h5 className="font-medium mb-2">Job Description</h5>
                              <p className="text-sm text-gray-600">{job.description}</p>
                            </div>

                            <div>
                              <h5 className="font-medium mb-2">Requirements</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {job.requirements.map((req, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <span className="text-primary">•</span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-medium mb-2">Benefits</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {job.benefits.map((benefit, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <span className="text-green-600">✓</span>
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Application Form */}
                          <div className="space-y-4">
                            <h4 className="font-semibold">Application Form</h4>
                            
                            <div className="space-y-2">
                              <Label>Resume/CV *</Label>
                              {applicationData.resume ? (
                                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm">{applicationData.resume.name}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setApplicationData(prev => ({...prev, resume: null}))}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                  <div className="text-center">
                                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600 mb-2">Upload your resume</p>
                                    <input
                                      type="file"
                                      accept=".pdf,.doc,.docx"
                                      onChange={handleFileUpload}
                                      className="hidden"
                                      id="resume-upload"
                                    />
                                    <Button variant="outline" size="sm" asChild>
                                      <label htmlFor="resume-upload" className="cursor-pointer">
                                        Choose File
                                      </label>
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label>Cover Letter</Label>
                              <Textarea
                                placeholder="Why are you interested in this position?"
                                value={applicationData.coverLetter}
                                onChange={(e) => setApplicationData(prev => ({...prev, coverLetter: e.target.value}))}
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Relevant Experience</Label>
                              <Textarea
                                placeholder="Describe your relevant work experience..."
                                value={applicationData.experience}
                                onChange={(e) => setApplicationData(prev => ({...prev, experience: e.target.value}))}
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Key Skills</Label>
                              <Input
                                placeholder="e.g., farming, animal care, machinery operation"
                                value={applicationData.skills}
                                onChange={(e) => setApplicationData(prev => ({...prev, skills: e.target.value}))}
                              />
                            </div>

                            <Button 
                              onClick={() => handleJobApplication(job)}
                              disabled={isApplying || !applicationData.resume}
                              className="w-full"
                            >
                              {isApplying ? 'Submitting Application...' : 'Submit Application'}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.description}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <GraduationCap className="h-3 w-3" />
                      <span>{job.education}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <span className="text-primary">{job.appliedCount} applied</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          {myApplications.map(application => (
            <Card key={application.id} className="card-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{application.jobTitle}</h4>
                      <p className="text-sm text-muted-foreground">{application.company}</p>
                      <p className="text-xs text-muted-foreground">
                        Applied on {new Date(application.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getApplicationStatusColor(application.status)}>
                      {application.status.replace('-', ' ')}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {application.statusMessage}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}