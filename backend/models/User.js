import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['vendor', 'seller'], default: 'vendor' },
  kycVerified: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);
