const PasswordHash = require('password-hash');

module.exports = (plainPassword, hashPassword) => PasswordHash.verify(plainPassword, hashPassword);
