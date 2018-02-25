const PasswordHash = require('password-hash');

const encryptedPassword = (plainPassword) => {
  const newPassword = PasswordHash.generate(plainPassword);
  return newPassword;
};

module.exports = encryptedPassword;
