const jwt = require('jsonwebtoken');
const User = require('../models/User');
const createToken = require('../utils/jwt');

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    console.log('User found:', user); // Debug log
    if (!user || !(await user.comparePassword(password))) {
      console.log('Password comparison failed for user:', phone); // Debug log
      console.log('Attempted password:', password); // Debug log
      return res.status(401).json({ message: 'Invalid phone or password' });
    }

    const token = createToken(user._id.toString(), user.role); // Ensure _id is a string
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.log('Login error:', err); // Debug log
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};