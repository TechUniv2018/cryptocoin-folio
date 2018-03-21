const transferToUser = require('../utils/helpers/transferToUser');
const getJWTpayload = require('../utils/helpers/getJWTpayload');
const getTransactionsForTransfers = require('../utils/helpers/getTransactionsForTransfers');
const getPayload = require('../utils/helpers/getUserFormPayload');

module.exports = [{
  method: 'GET',
  path: '/transfer',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({
        message: 'Token Expired',
      }).code(401);
    } else {
      const { userId } = userData;
      getTransactionsForTransfers(userId).then((transactions) => {
        response(transactions).code(200);
      }).catch(() => {
        response('Error').code(500);
      });
    }
  },
},
{
  method: 'POST',
  path: '/transfer',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({ message: 'Token Expired' }).code(401);
    } else {
      const fromId = userData.userId;
      const payload = getPayload(request);
      const { toId } = payload;
      const { coinId } = payload;
      const { quantity } = payload;
      transferToUser(fromId, toId, coinId, quantity).then(() => {
        response().code(201);
      }).catch(() => {
        response().code(500);
      });
    }
  },
}];

