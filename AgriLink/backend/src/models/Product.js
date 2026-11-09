import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  farmerName: String, farmerLocation: String,
  category: { type: String, enum: ['vegetables','fruits','grains','dairy','spices'], required: true, index: true },
  name: { type: String, required: true, trim: true },
  description: String, price: { type: Number, required: true, min: 0 },
  unit: { type: String, default: 'kg' },
  quantity: { type: Number, required: true, min: 0 },
  photo: String, harvestDate: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 }, isActive: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Product', productSchema);
