const jwt = require('jsonwebtoken');
const { jwtKey } = require('../constants');

module.exports = req => jwt.verify(req.headers.authtoken, jwtKey, (err, decoded) => {
  if (err) {
    return {
      message: 'token expired',
    };
  }
  return decoded;
});

