const getJWTpayload = require('../utils/helpers/getJWTpayload');
const addOrRemoveCoin = require('../../src/utils/helpers/addOrRemoveCoins');

module.exports = [{
  path: '/editPortfolioCoin',
  method: 'POST',
  handler: (request, reply) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      reply({ message: 'Token Expired' }).code(401);
    } else {
      const { userId } = userData;
      const { coin } = request.payload;
      const { quantity } = request.payload;
      const { price } = request.payload;
      addOrRemoveCoin(userId, coin, quantity, price).then(() => {
        reply('transaction inserted').code(201);
      }).catch(err => reply(`transaction failed ${err}`).code(500));
    }
  },

}];
