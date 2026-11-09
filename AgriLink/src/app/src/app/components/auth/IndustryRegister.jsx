import { useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { useApp } from '../contexts/AppContext'

export function IndustryRegister({ onOTP, onBack }) {
  const { language, changeLanguage, availableLanguages } = useLanguage()
  const { registerUser, users } = useApp()
  const [form, setForm] = useState({
    companyName: '', contactPerson: '', mobile: '', email: '',
    password: '', confirmPassword: '', businessType: '',
    registrationNumber: '', address: '', gstNumber: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }))

  const validate = () => {
    const errs = {}
    if (!form.companyName.trim()) errs.companyName = 'Company name is required'
    if (!form.contactPerson.trim()) errs.contactPerson = 'Contact person is required'
    if (!/^\d{10}$/.test(form.mobile)) errs.mobile = 'Enter valid 10-digit mobile'
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter valid email'
        if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (!form.businessType.trim()) errs.businessType = 'Business type is required'
    if (!form.address.trim()) errs.address = 'Address is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setLoading(true)
    try {
      const result = await registerUser({
        type: 'industry', name: form.contactPerson,
        companyName: form.companyName, contactPerson: form.contactPerson,
        mobile: form.mobile, email: form.email, password: form.password,
        businessType: form.businessType, registrationNumber: form.registrationNumber,
        gstNumber: form.gstNumber, address: form.address,
      })
      onOTP(result.userId, form.email, form.mobile)
    } catch (error) {
      setErrors(p => ({ ...p, email: error.message }))
    } finally { setLoading(false) }
  }

  const Field = ({ label, error, children }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )

  const inp = "w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground"

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-8 px-4">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {availableLanguages.map(lang => (
          <button key={lang.code} onClick={() => changeLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors duration-200 text-black ${
              language === lang.code ? 'bg-primary text-white border-primary' : 'bg-white border-border hover:border-primary'
            }`}>{lang.native}</button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl mx-auto"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🌾</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Register as Industry</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Company/Business Name *" error={errors.companyName}>
            <input className={inp} value={form.companyName} onChange={e => set('companyName', e.target.value)} placeholder="Company name" />
          </Field>
          <Field label="Contact Person *" error={errors.contactPerson}>
            <input className={inp} value={form.contactPerson} onChange={e => set('contactPerson', e.target.value)} placeholder="Contact person name" />
          </Field>
          <Field label="Mobile Number *" error={errors.mobile}>
            <input className={inp} value={form.mobile} onChange={e => set('mobile', e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile" />
          </Field>
          <Field label="Email *" error={errors.email}>
            <input className={inp} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Business email" />
          </Field>
          <Field label="Password *" error={errors.password}>
            <input className={inp} type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 6 characters" />
          </Field>
          <Field label="Confirm Password *" error={errors.confirmPassword}>
            <input className={inp} type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} placeholder="Repeat password" />
          </Field>
          <Field label="Business Type *" error={errors.businessType}>
            <select className={inp} value={form.businessType} onChange={e => set('businessType', e.target.value)}>
              <option value="">Select type</option>
              <option value="food_processing">Food Processing</option>
              <option value="retail">Retail Chain</option>
              <option value="export">Export House</option>
              <option value="restaurant">Restaurant/Hotel</option>
              <option value="wholesale">Wholesale Dealer</option>
              <option value="other">Other</option>
            </select>
          </Field>
          <Field label="GST Number" error={errors.gstNumber}>
            <input className={inp} value={form.gstNumber} onChange={e => set('gstNumber', e.target.value)} placeholder="GST number (optional)" />
          </Field>
          <Field label="Business Registration No." error={errors.registrationNumber}>
            <input className={inp} value={form.registrationNumber} onChange={e => set('registrationNumber', e.target.value)} placeholder="Registration number" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Business Address *" error={errors.address}>
              <textarea className={inp} rows={2} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Full business address" />
            </Field>
          </div>

          <div className="md:col-span-2 flex gap-4 mt-2">
            <button type="button" onClick={onBack}
              className="flex-1 border border-border text-foreground py-3 rounded-lg font-medium hover:bg-muted transition-colors duration-200">
              ← Back
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-60">
              {loading ? 'Submitting...' : 'Register & Send OTP'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
