const transferToUser = require('../utils/helpers/transferToUser');
const getJWTpayload = require('../utils/helpers/getJWTpayload');

module.exports = {
  method: 'POST',
  path: '/transfer',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({ message: 'Token Expired' }).code(401);
    } else {
      const { userId } = userData;
      const { emailTo } = request.payload;
      const coinSymbol = request.payload.symbol;
      const { quantity } = request.payload;
      console.log(userId, emailTo, coinSymbol, quantity);
      transferToUser(userId, emailTo, coinSymbol, quantity).then((reply) => {
        if (reply === 'transfer successful') {
          response(reply).code(201);
        } else {
          response(reply).code(401);
        }
      });
    }
  },
};

