const getJWTpayload = require('../utils/helpers/getJWTpayload');
const generateOtp = require('../utils/helpers/generateOtp');
const Models = require('../../models');
const msg91 = require('msg91')('204853AG5okXZJ5ab1d6d1', 'CFolio', '4');
const getUser = require('../utils/helpers/getUserDetails');

module.exports = [{
  method: 'PUT',
  path: '/otp',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({ message: 'Token Expired' }).code(401);
    } else {
      const { userId } = userData;
      const userPromise = getUser(userId);
      const otp = generateOtp();
      Models.otpMessages.upsert({
        userId,
        otp,
      }).then(() => {
        userPromise.then((user) => {
          console.log(user);
          msg91.send(user.mobileNumbe, `Your otp is ${otp} for verification.`, (err) => {
            if (err) {
              return response('Error occured').code(500);
            }
            return response(otp).code(200);
          });
        });
      }, () => {
        response().code(500);
      });
    }
  },
}];

