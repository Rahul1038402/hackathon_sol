const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{10}$/
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['vendor', 'supplier'],
    required: true
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log('Comparing passwords:'); // Debug log
  console.log('Candidate password:', candidatePassword); // Debug log
  console.log('Stored hash:', this.password); // Debug log
  const result = await bcrypt.compare(candidatePassword, this.password);
  console.log('Password comparison result:', result); // Debug log
  return result;
};

module.exports = mongoose.model('User', userSchema);