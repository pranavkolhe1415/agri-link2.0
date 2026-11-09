import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useAuth } from '../contexts/AuthContext'
import { 
  FileText, 
  Download, 
  Upload, 
  Search,
  Filter,
  Eye,
  Share2,
  Calendar,
  User,
  Building,
  CreditCard,
  Users,
  Home,
  Briefcase,
  Shield,
  FileCheck,
  AlertCircle
} from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { toast } from 'sonner@2.0.3'

export function DocumentCenter() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [uploadData, setUploadData] = useState({
    title: '',
    category: '',
    description: '',
    file: null
  })
  const [isUploading, setIsUploading] = useState(false)

  const documentCategories = [
    { value: 'forms', label: 'Government Forms', icon: FileText, color: 'bg-blue-100 text-blue-700' },
    { value: 'certificates', label: 'Certificates', icon: FileCheck, color: 'bg-green-100 text-green-700' },
    { value: 'applications', label: 'Applications', icon: User, color: 'bg-purple-100 text-purple-700' },
    { value: 'schemes', label: 'Scheme Documents', icon: Building, color: 'bg-orange-100 text-orange-700' },
    { value: 'legal', label: 'Legal Documents', icon: Shield, color: 'bg-red-100 text-red-700' },
    { value: 'tax', label: 'Tax Documents', icon: CreditCard, color: 'bg-yellow-100 text-yellow-700' },
    { value: 'others', label: 'Others', icon: FileText, color: 'bg-gray-100 text-gray-700' }
  ]

  const documents = [
    {
      id: 'DOC001',
      title: 'Income Certificate Application Form',
      category: 'forms',
      description: 'Application form for income certificate from Tehsildar office',
      fileName: 'income_certificate_form.pdf',
      fileSize: '245 KB',
      uploadedBy: 'Admin',
      uploadedAt: '2025-01-20',
      downloads: 156,
      isPublic: true,
      tags: ['Income', 'Certificate', 'Tehsildar']
    },
    {
      id: 'DOC002',
      title: 'Property Tax Assessment Form',
      category: 'tax',
      description: 'Form for property tax assessment and payment',
      fileName: 'property_tax_form.pdf',
      fileSize: '189 KB',
      uploadedBy: 'Tax Officer',
      uploadedAt: '2025-01-18',
      downloads: 89,
      isPublic: true,
      tags: ['Property', 'Tax', 'Assessment']
    },
    {
      id: 'DOC003',
      title: 'Caste Certificate Application',
      category: 'forms',
      description: 'Application form for caste certificate',
      fileName: 'caste_certificate_form.pdf',
      fileSize: '198 KB',
      uploadedBy: 'Admin',
      uploadedAt: '2025-01-15',
      downloads: 234,
      isPublic: true,
      tags: ['Caste', 'Certificate', 'SC/ST']
    },
    {
      id: 'DOC004',
      title: 'MNREGA Job Card Application',
      category: 'schemes',
      description: 'Application form for MNREGA job card registration',
      fileName: 'mnrega_jobcard_form.pdf',
      fileSize: '167 KB',
      uploadedBy: 'MNREGA Officer',
      uploadedAt: '2025-01-12',
      downloads: 345,
      isPublic: true,
      tags: ['MNREGA', 'Job Card', 'Employment']
    },
    {
      id: 'DOC005',
      title: 'Birth Certificate Application',
      category: 'certificates',
      description: 'Application for birth certificate from registrar office',
      fileName: 'birth_certificate_form.pdf',
      fileSize: '156 KB',
      uploadedBy: 'Registrar',
      uploadedAt: '2025-01-10',
      downloads: 123,
      isPublic: true,
      tags: ['Birth', 'Certificate', 'Registrar']
    },
    {
      id: 'DOC006',
      title: 'Domicile Certificate Form',
      category: 'forms',
      description: 'Application form for domicile certificate',
      fileName: 'domicile_certificate_form.pdf',
      fileSize: '178 KB',
      uploadedBy: 'Admin',
      uploadedAt: '2025-01-08',
      downloads: 198,
      isPublic: true,
      tags: ['Domicile', 'Certificate', 'Residence']
    }
  ]

  const myDocuments = [
    {
      id: 'MYDOC001',
      title: 'My Income Certificate',
      category: 'certificates',
      fileName: 'my_income_certificate.pdf',
      fileSize: '245 KB',
      uploadedAt: '2025-01-19',
      status: 'approved',
      isPrivate: true
    },
    {
      id: 'MYDOC002',
      title: 'Property Tax Receipt 2024',
      category: 'tax',
      fileName: 'property_tax_receipt_2024.pdf',
      fileSize: '156 KB',
      uploadedAt: '2025-01-16',
      status: 'verified',
      isPrivate: true
    }
  ]

  const getCategoryInfo = (categoryValue) => {
    return documentCategories.find(cat => cat.value === categoryValue) || documentCategories[0]
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadData(prev => ({
        ...prev,
        file: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      }))
    }
  }

  const handleUploadDocument = async () => {
    if (!uploadData.title || !uploadData.category || !uploadData.file) {
      toast.error('Please fill all required fields and select a file')
      return
    }

    setIsUploading(true)
    
    try {
      // Mock upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Document uploaded successfully!')
      
      // Reset form
      setUploadData({
        title: '',
        category: '',
        description: '',
        file: null
      })
    } catch (error) {
      toast.error('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = async (document) => {
    try {
      toast.success(`Downloading ${document.fileName}...`)
      // In real app, this would trigger actual download
    } catch (error) {
      toast.error('Download failed. Please try again.')
    }
  }

  const documentStats = {
    total: documents.length,
    forms: documents.filter(d => d.category === 'forms').length,
    certificates: documents.filter(d => d.category === 'certificates').length,
    downloaded: documents.reduce((sum, doc) => sum + doc.downloads, 0)
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{documentStats.total}</div>
            <div className="text-xs text-muted-foreground">Total Documents</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-green-600 mb-1">{documentStats.forms}</div>
            <div className="text-xs text-muted-foreground">Forms Available</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{documentStats.certificates}</div>
            <div className="text-xs text-muted-foreground">Certificates</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-orange-600 mb-1">{documentStats.downloaded}</div>
            <div className="text-xs text-muted-foreground">Downloads</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Upload */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search documents..." 
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
              {documentCategories.map(cat => (
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

        {/* Upload Document (Admin Only) */}
        {user?.role === 'admin' && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Document</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Document Title *</Label>
                    <Input
                      placeholder="Enter document title"
                      value={uploadData.title}
                      onChange={(e) => setUploadData(prev => ({...prev, title: e.target.value}))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select 
                      value={uploadData.category} 
                      onValueChange={(value) => setUploadData(prev => ({...prev, category: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentCategories.map(cat => (
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
                  <Label>Description</Label>
                  <Input
                    placeholder="Brief description of the document"
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({...prev, description: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>File *</Label>
                  {uploadData.file ? (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{uploadData.file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(uploadData.file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUploadData(prev => ({...prev, file: null}))}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Choose PDF, DOC, or image file</p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="document-upload"
                        />
                        <Button variant="outline" size="sm" asChild>
                          <label htmlFor="document-upload" className="cursor-pointer">
                            Choose File
                          </label>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleUploadDocument}
                  disabled={isUploading}
                  className="w-full"
                >
                  {isUploading ? 'Uploading...' : 'Upload Document'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Documents List */}
      <Tabs defaultValue="public" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="public">Public Documents ({documents.length})</TabsTrigger>
          <TabsTrigger value="my">My Documents ({myDocuments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map(document => (
              <DocumentCard 
                key={document.id} 
                document={document} 
                categoryInfo={getCategoryInfo(document.category)}
                onDownload={handleDownload}
                isPublic={true}
              />
            ))}
          </div>
          {filteredDocuments.length === 0 && (
            <Card className="card-shadow">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No documents found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="my" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myDocuments.map(document => (
              <DocumentCard 
                key={document.id} 
                document={document} 
                categoryInfo={getCategoryInfo(document.category)}
                onDownload={handleDownload}
                isPublic={false}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DocumentCard({ document, categoryInfo, onDownload, isPublic }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700'
      case 'verified': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${categoryInfo.color}`}>
              <categoryInfo.icon className="h-4 w-4" />
            </div>
            <Badge className={categoryInfo.color}>
              {categoryInfo.label}
            </Badge>
          </div>
          {!isPublic && document.status && (
            <Badge className={getStatusColor(document.status)}>
              {document.status}
            </Badge>
          )}
        </div>

        <h4 className="font-medium mb-2 line-clamp-2">{document.title}</h4>
        
        {document.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {document.description}
          </p>
        )}

        <div className="space-y-2 text-xs text-muted-foreground mb-4">
          <div className="flex items-center justify-between">
            <span>{document.fileName}</span>
            <span>{document.fileSize}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
            </span>
            {isPublic && (
              <span className="flex items-center space-x-1">
                <Download className="h-3 w-3" />
                <span>{document.downloads}</span>
              </span>
            )}
          </div>
          {isPublic && document.uploadedBy && (
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>by {document.uploadedBy}</span>
            </div>
          )}
        </div>

        {document.tags && document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {document.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <Button 
            onClick={() => onDownload(document)}
            size="sm"
            className="flex-1"
          >
            <Download className="h-3 w-3 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}