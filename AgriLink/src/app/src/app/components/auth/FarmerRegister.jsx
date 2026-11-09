import { useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { useApp } from '../contexts/AppContext'

export function FarmerRegister({ onOTP, onBack }) {
  const { language, changeLanguage, availableLanguages } = useLanguage()
  const { registerUser, users } = useApp()
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', password: '', confirmPassword: '',
    address: '', farmPhoto: null, idProofType: 'aadhaar', idProofPhoto: null,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }))

  const handleFile = (field, e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => set(field, reader.result)
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!/^\d{10}$/.test(form.mobile)) errs.mobile = 'Enter valid 10-digit mobile'
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter valid email'
        if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (!form.address.trim()) errs.address = 'Address is required'
    if (!form.farmPhoto) errs.farmPhoto = 'Farm photo is required'
    if (!form.idProofPhoto) errs.idProofPhoto = 'ID proof photo is required'
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
        type: 'farmer', name: form.name, mobile: form.mobile, email: form.email,
        password: form.password, address: form.address,
        farmPhoto: form.farmPhoto, idProofType: form.idProofType, idProofPhoto: form.idProofPhoto,
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
          <h1 className="text-2xl font-bold text-foreground">Register as Farmer</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name *" error={errors.name}>
            <input className={inp} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" />
          </Field>
          <Field label="Mobile Number *" error={errors.mobile}>
            <input className={inp} value={form.mobile} onChange={e => set('mobile', e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile" />
          </Field>
          <Field label="Email *" error={errors.email}>
            <input className={inp} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Your email" />
          </Field>
          <Field label="Password *" error={errors.password}>
            <input className={inp} type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 6 characters" />
          </Field>
          <Field label="Confirm Password *" error={errors.confirmPassword}>
            <input className={inp} type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} placeholder="Repeat password" />
          </Field>
          <Field label="ID Proof Type *" error={errors.idProofType}>
            <select className={inp} value={form.idProofType} onChange={e => set('idProofType', e.target.value)}>
              <option value="aadhaar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field label="Address *" error={errors.address}>
              <textarea className={inp} rows={2} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Your full address" />
            </Field>
          </div>
          <Field label="Farm Photo *" error={errors.farmPhoto}>
            <input type="file" accept="image/*" onChange={e => handleFile('farmPhoto', e)}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-foreground file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary cursor-pointer" />
            {form.farmPhoto && <img src={form.farmPhoto} alt="farm" className="mt-2 h-20 w-full object-cover rounded-lg" />}
          </Field>
          <Field label={`${form.idProofType === 'pan' ? 'PAN Card' : 'Aadhaar Card'} Photo *`} error={errors.idProofPhoto}>
            <input type="file" accept="image/*" onChange={e => handleFile('idProofPhoto', e)}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-foreground file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary cursor-pointer" />
            {form.idProofPhoto && <img src={form.idProofPhoto} alt="id" className="mt-2 h-20 w-full object-cover rounded-lg" />}
          </Field>

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
