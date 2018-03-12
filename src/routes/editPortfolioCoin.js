const getJWTpayload = require('../utils/helpers/getJWTpayload');
const addOrRemoveCoin = require('../../src/utils/helpers/addOrRemoveCoins');
const getUserFormPayload = require('../../src/utils/helpers/getUserFormPayload');

module.exports = [{
  path: '/editPortfolioCoin',
  method: 'POST',
  handler: (request, reply) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      reply({ message: 'Token Expired' }).code(401);
    } else {
      const payload = getUserFormPayload(request);
      const { userId } = userData;
      const { coin } = payload;
      const { quantity } = payload;
      const { price } = payload;
      addOrRemoveCoin(userId, coin, quantity, price).then((result) => {
        reply(result).code(201);
      }).catch(err => reply(`transaction failed ${err}`).code(500));
    }
  },

}];
