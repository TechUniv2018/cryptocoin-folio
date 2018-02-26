const PasswordHash = require('password-hash');

const encryptPassword = (plainPassword) => {
  const newPassword = PasswordHash.generate(plainPassword);
  return newPassword;
};

module.exports = encryptPassword;
