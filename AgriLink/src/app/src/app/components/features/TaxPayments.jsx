import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  CreditCard, 
  Home, 
  Droplets, 
  Calendar, 
  Receipt, 
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Filter,
  Search
} from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { toast } from 'sonner@2.0.3'

export function TaxPayments() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [selectedBill, setSelectedBill] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [processing, setProcessing] = useState(false)

  const bills = [
    {
      id: 'HT001',
      type: 'house',
      title: 'House Tax',
      amount: 1200,
      dueDate: '2025-01-25',
      status: 'overdue',
      period: 'Q4 2024',
      penalty: 120,
      description: 'Property tax for residential building'
    },
    {
      id: 'WT002',
      type: 'water',
      title: 'Water Tax',
      amount: 320,
      dueDate: '2025-01-30',
      status: 'due',
      period: 'January 2025',
      penalty: 0,
      description: 'Monthly water supply charges'
    },
    {
      id: 'HT003',
      type: 'house',
      title: 'House Tax',
      amount: 1200,
      dueDate: '2025-04-25',
      status: 'upcoming',
      period: 'Q1 2025',
      penalty: 0,
      description: 'Property tax for residential building'
    },
    {
      id: 'SW004',
      type: 'sewage',
      title: 'Sewage Tax',
      amount: 180,
      dueDate: '2025-02-15',
      status: 'due',
      period: 'January 2025',
      penalty: 0,
      description: 'Sewage treatment charges'
    }
  ]

  const paymentHistory = [
    {
      id: 'PAY001',
      billId: 'HT000',
      type: 'house',
      amount: 1150,
      date: '2024-12-20',
      method: 'UPI',
      status: 'completed',
      transactionId: 'TXN123456789'
    },
    {
      id: 'PAY002',
      billId: 'WT001',
      type: 'water',
      amount: 285,
      date: '2024-12-18',
      method: 'Card',
      status: 'completed',
      transactionId: 'TXN123456788'
    }
  ]

  const getBillIcon = (type) => {
    switch (type) {
      case 'house': return Home
      case 'water': return Droplets
      case 'sewage': return Droplets
      default: return Receipt
    }
  }

  const getBillStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-700'
      case 'due': return 'bg-orange-100 text-orange-700'
      case 'upcoming': return 'bg-blue-100 text-blue-700'
      case 'paid': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handlePayment = async (bill) => {
    setProcessing(true)
    
    // Mock payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock successful payment
      toast.success(`Payment of ₹${bill.amount + bill.penalty} successful!`)
      
      // Update bill status (in real app, this would update the database)
      const updatedBills = bills.map(b => 
        b.id === bill.id ? { ...b, status: 'paid' } : b
      )
      
      setSelectedBill(null)
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const totalDue = bills
    .filter(bill => bill.status === 'due' || bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount + bill.penalty, 0)

  const upcomingPayments = bills.filter(bill => bill.status === 'upcoming').length

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-red-600 mb-1">₹{totalDue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Due</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{upcomingPayments}</div>
            <div className="text-xs text-muted-foreground">Upcoming</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-green-600 mb-1">₹3,680</div>
            <div className="text-xs text-muted-foreground">Paid This Year</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-purple-600 mb-1">12</div>
            <div className="text-xs text-muted-foreground">Total Bills</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Pay All Due</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
              <Receipt className="h-6 w-6" />
              <span className="text-sm">Download Bills</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Set Reminders</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
              <Download className="h-6 w-6" />
              <span className="text-sm">Tax Certificate</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Bills */}
      <Card className="card-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pending Bills</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {bills.filter(bill => bill.status !== 'paid').map((bill) => {
            const Icon = getBillIcon(bill.type)
            return (
              <div key={bill.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{bill.title}</h4>
                      <Badge className={getBillStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{bill.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Period: {bill.period} • Due: {new Date(bill.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">₹{bill.amount.toLocaleString()}</div>
                  {bill.penalty > 0 && (
                    <div className="text-sm text-red-600">+₹{bill.penalty} penalty</div>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setSelectedBill(bill)}
                      >
                        Pay Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Pay {bill.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span>Bill Amount</span>
                            <span>₹{bill.amount}</span>
                          </div>
                          {bill.penalty > 0 && (
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-red-600">Late Fee</span>
                              <span className="text-red-600">₹{bill.penalty}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center font-semibold border-t pt-2">
                            <span>Total Amount</span>
                            <span>₹{bill.amount + bill.penalty}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Payment Method</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                              onClick={() => setPaymentMethod('upi')}
                              className="h-12"
                            >
                              <ImageWithFallback 
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&q=80"
                                alt="UPI"
                                className="w-6 h-6 mr-2"
                              />
                              UPI
                            </Button>
                            <Button
                              variant={paymentMethod === 'card' ? 'default' : 'outline'}
                              onClick={() => setPaymentMethod('card')}
                              className="h-12"
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Card
                            </Button>
                          </div>
                        </div>

                        {paymentMethod === 'upi' && (
                          <div className="space-y-2">
                            <Label>UPI ID</Label>
                            <Input placeholder="yourname@upi" />
                          </div>
                        )}

                        {paymentMethod === 'card' && (
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label>Card Number</Label>
                              <Input placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Expiry</Label>
                                <Input placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label>CVV</Label>
                                <Input placeholder="123" />
                              </div>
                            </div>
                          </div>
                        )}

                        <Button 
                          onClick={() => handlePayment(bill)}
                          disabled={processing}
                          className="w-full"
                        >
                          {processing ? 'Processing...' : `Pay ₹${bill.amount + bill.penalty}`}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {payment.type === 'house' ? 'House Tax' : 'Water Tax'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.transactionId} • {payment.method}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">₹{payment.amount}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}