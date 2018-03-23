const Models = require('../../../models');

module.exports = (userId, otp) => Models.otpMessages.findAll({
  where: {
    userId,
    otp,
  },
  raw: true,
});

