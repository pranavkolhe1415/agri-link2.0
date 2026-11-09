import { useState } from 'react'
import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'

export function PendingApprovals({ onBack }) {
  const { users, approveUser, rejectUser, deleteUser } = useApp()
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [actionError, setActionError] = useState('')
  const [busy, setBusy] = useState(false)
  const runAction = async (action, id) => { setBusy(true); setActionError(''); try { await action(id); setSelected(null) } catch (e) { setActionError(e.message || 'Action failed') } finally { setBusy(false) } }

  const pending = users.filter(u => {
    if (u.status !== 'pending' || u.type === 'admin' || !u.otpVerifiedAt) return false
    if (filter !== 'all' && u.type !== filter) return false
    const q = search.toLowerCase()
    return !q || (u.name || '').toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.companyName || '').toLowerCase().includes(q)
  })

  if (selected) {
    const u = users.find(x => x.id === selected)
    if (!u) { setSelected(null); return null }
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="bg-white border-b border-border px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">← Back</button>
            <h1 className="text-xl font-bold text-foreground">Registration Details</h1>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                {u.type === 'farmer' ? '🌱' : '🏭'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{u.companyName || u.name}</h2>
                <span className="text-sm text-muted-foreground capitalize">{u.type} registration</span>
              </div>
              <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Pending</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Name', u.name], ['Email', u.email], ['Mobile', u.mobile], ['Address', u.address],
                u.type === 'farmer' ? ['ID Proof', u.idProofType === 'pan' ? 'PAN Card' : 'Aadhaar Card'] : ['Company', u.companyName],
                u.type === 'farmer' ? null : ['Business Type', u.businessType],
                u.type === 'farmer' ? null : ['GST', u.gstNumber || '—'],
                ['Registered', new Date(u.registeredAt).toLocaleDateString('en-IN')],
              ].filter(Boolean).map(([label, value]) => (
                <div key={label}>
                  <p className="text-muted-foreground">{label}</p>
                  <p className="font-medium text-foreground capitalize">{value}</p>
                </div>
              ))}
            </div>

            {u.farmPhoto && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Farm Photo</p>
                <img src={u.farmPhoto} alt="farm" className="h-40 rounded-xl object-cover w-full" />
              </div>
            )}
            {u.idProofPhoto && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">{u.idProofType === 'pan' ? 'PAN Card' : 'Aadhaar Card'}</p>
                <img src={u.idProofPhoto} alt="id" className="h-40 rounded-xl object-cover w-full" />
              </div>
            )}

            {actionError && <p className="text-sm text-red-600">{actionError}</p>}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button disabled={busy}
                onClick={() => runAction(approveUser,u.id)}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >✓ Approve</button>
              <button disabled={busy}
                onClick={() => runAction(rejectUser,u.id)}
                className="flex-1 border border-yellow-500 text-yellow-700 py-3 rounded-lg font-medium hover:bg-yellow-50 transition-colors"
              >✗ Reject</button>
              <button disabled={busy}
                onClick={() => runAction(deleteUser,u.id)}
                className="flex-1 border border-red-300 text-red-600 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >🗑 Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground">← Dashboard</button>
          <h1 className="text-xl font-bold text-foreground">Pending Approvals</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
            className="flex-1 px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground" />
          <div className="flex gap-2">
            {['all', 'farmer', 'industry'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:border-primary'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-foreground mb-2">No Pending Requests</h2>
            <p className="text-muted-foreground">All registrations have been processed.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  {u.type === 'farmer' ? '🌱' : '🏭'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{u.companyName || u.name}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize flex-shrink-0">{u.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{u.email} • {u.mobile}</p>
                  <p className="text-xs text-muted-foreground">{new Date(u.registeredAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setSelected(u.id)}
                    className="px-3 py-1.5 border border-border text-foreground rounded-lg text-sm hover:border-primary transition-colors">View</button>
                  <button onClick={() => approveUser(u.id)}
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">✓</button>
                  <button onClick={() => rejectUser(u.id)}
                    className="px-3 py-1.5 border border-yellow-400 text-yellow-700 rounded-lg text-sm hover:bg-yellow-50 transition-colors">✗</button>
                  <button onClick={() => deleteUser(u.id)}
                    className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors">🗑</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
