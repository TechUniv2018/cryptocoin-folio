const getJWTpayload = require('../utils/helpers/getJWTpayload');

module.exports = [{
  method: 'GET',
  path: '/otp',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({ message: 'Token Expired' }).code(401);
    } else {
      response('OTP').code(200);
    }
  },
}];

