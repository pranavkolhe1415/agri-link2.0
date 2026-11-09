import { useState } from 'react'
import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'
import { AddProduct } from './AddProduct'

export function FarmerSelling({ user, onBack }) {
  const { products, deleteProduct } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const farmerProducts = products.filter(p => p.farmerId === user.id)

  if (showAdd) return <AddProduct user={user} onBack={() => setShowAdd(false)} />

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
              ← Dashboard
            </button>
            <h1 className="text-xl font-bold text-foreground">My Products</h1>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            + Add New Product
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {farmerProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-bold text-foreground mb-2">No Products Yet</h2>
            <p className="text-muted-foreground mb-6">Start adding your agricultural products for industry buyers</p>
            <button onClick={() => setShowAdd(true)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {farmerProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-border overflow-hidden group hover:shadow-md transition-all duration-200"
              >
                <div className="relative overflow-hidden h-44">
                  <img src={product.photo} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full font-medium text-foreground capitalize">
                    {product.category}
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-xs font-semibold text-foreground">{product.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-1">Listed: {product.date}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">₹{product.price}<span className="text-xs font-normal text-muted-foreground">/{product.unit}</span></span>
                    <span className="text-sm text-foreground font-medium">{product.quantity} {product.unit}</span>
                  </div>
                  {confirmDelete === product.id ? (
                    <div className="flex gap-2">
                      <button onClick={() => { deleteProduct(product.id); setConfirmDelete(null) }}
                        className="flex-1 bg-red-500 text-white py-1.5 rounded-lg text-sm hover:bg-red-600 transition-colors">Confirm</button>
                      <button onClick={() => setConfirmDelete(null)}
                        className="flex-1 border border-border text-foreground py-1.5 rounded-lg text-sm hover:bg-muted transition-colors">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(product.id)}
                      className="w-full border border-red-200 text-red-600 py-1.5 rounded-lg text-sm hover:bg-red-50 transition-colors">
                      Remove Product
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
