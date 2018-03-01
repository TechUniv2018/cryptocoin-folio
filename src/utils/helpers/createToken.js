const jwt = require('jsonwebtoken');

module.exports = userdetails => jwt.sign({
  userID: userdetails.id,
}, 'cryptic-crypto', {
  algorithm: 'HS256',
  expiresIn: '4h',
});
