import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['farmer','industry','admin'], required: true, index: true },
  name: { type: String, trim: true },
  companyName: { type: String, trim: true },
  contactPerson: { type: String, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true, unique: true, index: true },
  mobile: { type: String, trim: true },
  passwordHash: { type: String, required: true, select: false },
  address: String,
  farmPhoto: String,
  idProofType: { type: String, enum: ['aadhaar','pan'] },
  idProofPhoto: String,
  businessType: String,
  registrationNumber: String,
  gstNumber: String,
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending', index: true },
  otpHash: { type: String, select: false },
  otpExpiresAt: Date,
  otpVerifiedAt: Date,
  approvedAt: Date,
  rejectedAt: Date,
}, { timestamps: true });
userSchema.methods.toSafeJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash; delete obj.otpHash; delete obj.otpExpiresAt;
  delete obj.__v;
  return { ...obj, id: obj._id.toString() };
};
export default mongoose.model('User', userSchema);
