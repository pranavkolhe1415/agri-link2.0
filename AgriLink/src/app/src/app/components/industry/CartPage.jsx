import { motion } from 'motion/react'
import { useApp } from '../contexts/AppContext'

export function CartPage({ user, onBack, onCheckout }) {
  const { cart, updateCartQty, removeFromCart, clearCart, placeOrder } = useApp()
  const total = cart.reduce((s, item) => s + item.product.price * item.quantity, 0)

  const handlePlaceAll = () => {
    cart.forEach(item => {
      placeOrder(user, item.product, item.quantity)
    })
    clearCart()
    onBack()
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="bg-white border-b border-border px-4 py-4">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">← Products</button>
            <h1 className="text-xl font-bold text-foreground">Cart</h1>
          </div>
        </div>
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-foreground mb-2">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">Browse products and add items to cart</p>
          <button onClick={onBack}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">← Products</button>
            <h1 className="text-xl font-bold text-foreground">Cart ({cart.length} items)</h1>
          </div>
          <button onClick={clearCart} className="text-sm text-red-600 hover:underline">Clear Cart</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, i) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center gap-4"
              >
                <img src={item.product.photo} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">By {item.product.farmerName} • {item.product.farmerLocation}</p>
                  <p className="text-sm font-medium text-primary">₹{item.product.price}/{item.product.unit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQty(item.productId, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors font-bold"
                  >−</button>
                  <span className="w-12 text-center font-medium text-foreground">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQty(item.productId, Math.min(item.quantity + 1, item.product.quantity))}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors font-bold"
                  >+</button>
                </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">₹{(item.product.price * item.quantity).toLocaleString()}</div>
                  <button onClick={() => removeFromCart(item.productId)}
                    className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-border p-5 sticky top-4">
              <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                    <span className="text-foreground">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 mb-5">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button onClick={handlePlaceAll}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
