import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Leaf, Sun, Moon, Phone, Shield } from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

export function LoginScreen() {
  const [step, setStep] = useState('mobile')
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { login } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  const handleSendOTP = async () => {
    if (mobile.length !== 10) return
    setLoading(true)
    
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
    }, 1500)
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return
    setLoading(true)
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false)
      
      // Mock user data - in real app this would come from backend
      const mockUser = {
        id: '1',
        mobile,
        name: mobile === '9999999999' ? 'Admin User' : 'Village User',
        role: mobile === '9999999999' ? 'admin' : 'villager',
        village: 'Shivapur'
      }
      
      login(mockUser)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-green-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Village background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Language and Theme Selector */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Select value={language} onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger className="w-32 bg-white/90 dark:bg-gray-800/90">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t('language.english')}</SelectItem>
            <SelectItem value="hi">{t('language.hindi')}</SelectItem>
            <SelectItem value="mr">{t('language.marathi')}</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={toggleTheme}
          className="bg-white/90 dark:bg-gray-800/90"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="card-shadow">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-primary rounded-full p-4">
                <Leaf className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">{t('auth.title')}</CardTitle>
              <p className="text-muted-foreground mt-2">
                {t('auth.subtitle')}
              </p>
            </div>
            
            {/* Demo Credentials */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium text-center">Demo Credentials:</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span>Villager:</span>
                  <Badge variant="outline">9876543210</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Admin:</span>
                  <Badge variant="outline">9999999999</Badge>
                </div>
                <div className="flex items-center justify-center">
                  <span>OTP: 123456</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 'mobile' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('auth.mobile')}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="pl-10"
                      maxLength={10}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSendOTP}
                  className="w-full"
                  disabled={mobile.length !== 10 || loading}
                >
                  {loading ? t('common.loading') : t('auth.send_otp')}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('auth.otp')}</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="pl-10 text-center tracking-wider"
                      maxLength={6}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    OTP sent to +91-{mobile}
                  </p>
                </div>
                
                <Button 
                  onClick={handleVerifyOTP}
                  className="w-full"
                  disabled={otp.length !== 6 || loading}
                >
                  {loading ? t('common.loading') : t('auth.verify_otp')}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setStep('mobile')}
                  className="w-full"
                >
                  Change Mobile Number
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}