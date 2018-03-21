const encryptPassword = require('./encryptPassword');

const encryptedUserData = formData => ({
  fullName: formData.fullName,
  email: formData.email,
  mobileNumbe: formData.mobileNumbe,
  password: encryptPassword(formData.password),
});

module.exports = encryptedUserData;
