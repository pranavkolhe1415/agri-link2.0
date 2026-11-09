import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export function BuyNowModal({ product, user, onClose }) {
  const { placeOrder } = useApp()
  const [qty, setQty] = useState(1)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleBuy = () => {
    if (qty < 1 || qty > product.quantity) {
      setError(`Quantity must be between 1 and ${product.quantity} ${product.unit}`)
      return
    }
    placeOrder(user, product, qty)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Order Placed!</h2>
          <p className="text-muted-foreground text-sm mb-1">
            {qty} {product.unit} of <strong>{product.name}</strong>
          </p>
          <p className="text-2xl font-bold text-primary mb-6">₹{(product.price * qty).toLocaleString()}</p>
          <button onClick={onClose}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-foreground">Buy Now</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground text-xl">×</button>
        </div>

        <div className="flex items-center gap-3 mb-5 p-3 bg-muted/30 rounded-xl">
          <img src={product.photo} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
          <div>
            <h3 className="font-semibold text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground">By {product.farmerName}</p>
            <p className="text-sm font-medium text-primary">₹{product.price}/{product.unit}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Available Quantity:</span>
            <span className="font-medium text-foreground">{product.quantity} {product.unit}</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Quantity ({product.unit})
          </label>
          <div className="flex items-center gap-3">
            <button onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors font-bold text-lg">−</button>
            <input
              type="number" value={qty} min={1} max={product.quantity}
              onChange={e => setQty(Math.min(Number(e.target.value), product.quantity))}
              className="flex-1 text-center text-xl font-bold border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button onClick={() => setQty(q => Math.min(q + 1, product.quantity))}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors font-bold text-lg">+</button>
          </div>
          <button onClick={() => setQty(product.quantity)}
            className="mt-2 text-xs text-primary hover:underline">Buy full available quantity ({product.quantity} {product.unit})</button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="border-t border-border pt-4 mb-5">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="text-2xl font-bold text-primary">₹{(product.price * qty).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 border border-border text-foreground py-3 rounded-lg font-medium hover:bg-muted transition-colors">
            Cancel
          </button>
          <button onClick={handleBuy}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  )
}
