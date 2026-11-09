import { useState } from 'react'
import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'

export function IndustryManagement({ onBack }) {
  const { users, orders, products } = useApp()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const industries = users.filter(u => {
    if (u.type !== 'industry') return false
    if (filter !== 'all' && u.status !== filter) return false
    const q = search.toLowerCase()
    return !q || (u.companyName || '').toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.name || '').toLowerCase().includes(q)
  })

  if (selected) {
    const ind = users.find(u => u.id === selected)
    if (!ind) { setSelected(null); return null }
    const indOrders = orders.filter(o => o.industryId === ind.id)
    const contactedFarmers = [...new Set(indOrders.map(o => o.farmerName))]
    const purchasedProducts = [...new Set(indOrders.map(o => o.productName))]

    return (
      <div className="min-h-screen bg-muted/30">
        <div className="bg-white border-b border-border px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">← All Industries</button>
            <h1 className="text-xl font-bold text-foreground">Industry Profile</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-3xl">🏭</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{ind.companyName}</h2>
                <p className="text-muted-foreground">{ind.email}</p>
              </div>
              <span className={`text-sm px-3 py-1 rounded-full capitalize font-medium ${
                ind.status === 'approved' ? 'bg-green-100 text-green-700' :
                ind.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>{ind.status}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {[
                ['Contact Person', ind.name], ['Mobile', ind.mobile], ['Address', ind.address],
                ['Business Type', ind.businessType || '—'], ['GST', ind.gstNumber || '—'],
                ['Reg. Number', ind.registrationNumber || '—'],
                ['Registered', new Date(ind.registeredAt).toLocaleDateString('en-IN')],
                ['Total Orders', indOrders.length],
                ['Total Spent', `₹${indOrders.reduce((s, o) => s + o.totalAmount, 0).toLocaleString()}`],
              ].map(([label, value]) => (
                <div key={label}><p className="text-muted-foreground">{label}</p><p className="font-medium text-foreground capitalize">{value}</p></div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border p-5">
            <h3 className="font-bold text-foreground mb-3">Purchase History ({indOrders.length})</h3>
            {indOrders.length === 0 ? <p className="text-muted-foreground text-sm">No purchases yet</p> : (
              <div className="space-y-2">
                {indOrders.map(o => (
                  <div key={o.id} className="flex justify-between items-center p-2 bg-muted/30 rounded-lg text-sm">
                    <div>
                      <p className="font-medium text-foreground">{o.productName}</p>
                      <p className="text-muted-foreground">{o.farmerName} • {o.quantity} {o.unit}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.date).toLocaleDateString('en-IN')}</p>
                    </div>
                    <span className="font-bold text-primary">₹{o.totalAmount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {contactedFarmers.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-border p-5">
              <h3 className="font-bold text-foreground mb-3">Farmers Contacted</h3>
              <div className="flex flex-wrap gap-2">
                {contactedFarmers.map(name => (
                  <span key={name} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">{name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">← Dashboard</button>
          <h1 className="text-xl font-bold text-foreground">Industry Management</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search industries..."
            className="flex-1 px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground" />
          <div className="flex gap-2">
            {['all', 'approved', 'pending', 'rejected'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                  filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:border-primary'
                }`}>{f}</button>
            ))}
          </div>
        </div>
        {industries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏭</div>
            <p className="text-xl font-bold text-foreground mb-2">No Industries Found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {industries.map((u, i) => (
              <motion.div key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center gap-4 cursor-pointer hover:border-primary transition-colors"
                onClick={() => setSelected(u.id)}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">🏭</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{u.companyName}</p>
                  <p className="text-sm text-muted-foreground truncate">{u.email} • {u.businessType || 'Industry'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium flex-shrink-0 ${
                  u.status === 'approved' ? 'bg-green-100 text-green-700' :
                  u.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>{u.status}</span>
                <span className="text-muted-foreground text-sm">→</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
