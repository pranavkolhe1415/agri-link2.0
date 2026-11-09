import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  industry: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 0.001 },
  unit: String, pricePerUnit: Number, totalAmount: Number,
  status: { type: String, enum: ['placed','confirmed','completed','cancelled'], default: 'placed' }
}, { timestamps: true });
export default mongoose.model('Order', orderSchema);
