const Models = require('../../models');
const getJWTpayload = require('../utils/helpers/getJWTpayload');
const getPayload = require('../utils/helpers/getUserFormPayload');
const getUserCount = require('../utils/helpers/getUserCount');
const getCoinCount = require('../utils/helpers/getCoinCount');
const pusherFunction = require('../utils/helpers/pusherFunction');

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
      const receiver = getUserCount(toId);
      const coin = getCoinCount(coinId);
      Promise.all([sender, coin, receiver])
        .then(([senderInfo, coinInfo, receiverInfo]) => {
          if (senderInfo.length > 0 && coinInfo.length > 0) {
            console.log(coinInfo);
            const transaction = {
              status: 1,
              toId,
              fromId,
              coinId: coinInfo[0].id,
              quantity,
              price: 0,
            };
            return Models.transactions.create(transaction)
              .then(() => Models.notifications.create({
                userId: fromId,
                text: `${receiverInfo[0].fullName} has requested ${quantity} ${coinId}s`,
                status: 1,
              }))
              .then(() => Models.users.findOne({
                where: {
                  id: fromId,
                },
              }))
              .then((data) => {
                pusherFunction({
                  name: data.dataValues.userName,
                  text: 'idk what text to be entered so I typed this for fun',
                  status: 1,
                });
              });
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
