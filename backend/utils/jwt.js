const jwt = require('jsonwebtoken');

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

module.exports = createToken;
