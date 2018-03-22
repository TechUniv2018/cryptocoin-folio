const Models = require('../../models');
const getJWTpayload = require('../utils/helpers/getJWTpayload');
const getPayload = require('../utils/helpers/getUserFormPayload');
const getUserCount = require('../utils/helpers/getUserCount');
const getCoinCount = require('../utils/helpers/getCoinCount');

module.exports = [{
  method: 'POST',
  path: '/request',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({ message: 'Token Expired' }).code(401);
    } else {
      const toId = userData.userId;
      const payload = getPayload(request);
      const { fromId, coinId, quantity } = payload;
      const sender = getUserCount(fromId);
      const coin = getCoinCount(coinId);
      Promise.all([sender, coin])
        .then(([senderCount, coinCount]) => {
          if (senderCount > 0 && coinCount.length > 0) {
            console.log(coinCount);
            const transaction = {
              status: 1,
              toId,
              fromId,
              coinId: coinCount[0].id,
              quantity,
              price: 0,
            };
            return Models.transactions.create(transaction);
          }
          throw new Error('bleh');
        })
        .then(() => response('Request inserted').code(201))
        .catch((err) => {
          console.log(err);
          return response('Error while inserting request').code(500);
        });
    }
  },
}];
