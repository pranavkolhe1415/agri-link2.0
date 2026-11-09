import { useState } from 'react'
import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'

const CATEGORIES = ['vegetables', 'fruits', 'grains', 'dairy', 'spices']
const UNITS = ['kg', 'quintal', 'ton', 'liter', 'dozen', 'bag']

export function AddProduct({ user, onBack }) {
  const { addProduct } = useApp()
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    category: '', name: '', price: '', quantity: '', unit: 'kg', date: today, photo: null,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }))

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => set('photo', reader.result)
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const errs = {}
    if (!form.category) errs.category = 'Select a category'
    if (!form.name.trim()) errs.name = 'Product name is required'
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errs.price = 'Enter valid price'
    if (!form.quantity || isNaN(form.quantity) || Number(form.quantity) <= 0) errs.quantity = 'Enter valid quantity'
    if (!form.photo) errs.photo = 'Product photo is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      addProduct({
        farmerId: user.id,
        farmerName: user.name,
        farmerLocation: user.address?.split(',').slice(-2).join(',').trim() || 'India',
        category: form.category,
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
        unit: form.unit,
        date: form.date,
        photo: form.photo,
      })
      setSuccess(true)
    }, 600)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Product Added!</h2>
          <p className="text-muted-foreground mb-6">Your product is now visible to industry buyers.</p>
          <button onClick={onBack}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Back to My Products
          </button>
        </div>
      </div>
    )
  }

  const inp = "w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground"

  const Field = ({ label, error, children }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">← My Products</button>
          <h1 className="text-xl font-bold text-foreground">Add New Product</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-border p-8"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Category *" error={errors.category}>
              <select className={inp} value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </Field>
            <Field label="Product Name *" error={errors.name}>
              <input className={inp} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Fresh Tomatoes" />
            </Field>
            <Field label="Price per Unit (₹) *" error={errors.price}>
              <input className={inp} type="number" min="1" value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. 40" />
            </Field>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Available Quantity *</label>
              <div className="flex gap-2">
                <input
                  className={`flex-1 ${inp}`} type="number" min="1"
                  value={form.quantity} onChange={e => set('quantity', e.target.value)}
                  placeholder="e.g. 500"
                />
                <select className="px-3 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground"
                  value={form.unit} onChange={e => set('unit', e.target.value)}>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
            </div>
            <Field label="Product Date *" error={errors.date}>
              <input className={inp} type="date" value={form.date} onChange={e => set('date', e.target.value)} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Product Photo *" error={errors.photo}>
                <input type="file" accept="image/*" onChange={handleFile}
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary cursor-pointer" />
                {form.photo && (
                  <img src={form.photo} alt="preview" className="mt-3 h-40 w-full object-cover rounded-xl" />
                )}
              </Field>
            </div>
            <div className="md:col-span-2 flex gap-4 mt-2">
              <button type="button" onClick={onBack}
                className="flex-1 border border-border text-foreground py-3 rounded-lg font-medium hover:bg-muted transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-60">
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
