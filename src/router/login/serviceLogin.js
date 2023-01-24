const jwt = require('jsonwebtoken');

const generateToken = user => {
  return jwt.sign({ ...user }, 'shhhhh');
};

module.exports = generateToken;
