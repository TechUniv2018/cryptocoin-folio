const getJWTpayload = require('../utils/helpers/getJWTpayload');
const generateOtp = require('../utils/helpers/generateOtp');
const Models = require('../../models');

module.exports = [{
  method: 'PUT',
  path: '/otp',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({ message: 'Token Expired' }).code(401);
    } else {
      const { userId } = userData;
      const otp = generateOtp();
      Models.otpMessages.upsert({
        userId,
        otp,
      }).then(() => {
        response().code(200);
      }, () => {
        response().code(500);
      });
    }
  },
}];

