import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'

export function IndustryHistory({ user, onBack }) {
  const { orders } = useApp()
  const industryOrders = orders.filter(o => o.industryId === user.id)

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">← Dashboard</button>
          <h1 className="text-xl font-bold text-foreground">Purchase History</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {industryOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-foreground mb-2">No Purchases Yet</h2>
            <p className="text-muted-foreground">Your purchase history will appear here after buying products.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {industryOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-border p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">{order.productName}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">{order.category}</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>🌱 Farmer: <span className="font-medium text-foreground">{order.farmerName}</span></div>
                      <div>📦 {order.quantity} {order.unit} @ ₹{order.pricePerUnit}/{order.unit}</div>
                      <div>📅 {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">₹{order.totalAmount.toLocaleString()}</div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Completed</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {industryOrders.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-border p-5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Total Spent</span>
              <span className="text-2xl font-bold text-primary">
                ₹{industryOrders.reduce((s, o) => s + o.totalAmount, 0).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
