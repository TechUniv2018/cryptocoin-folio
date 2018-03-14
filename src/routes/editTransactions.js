const getJWTpayload = require('../utils/helpers/getJWTpayload');
const deleteTransaction = require('../../src/utils/helpers/deleteTransaction');
const editTransaction = require('../../src/utils/helpers/editTransaction');
const getUserFormPayload = require('../utils/helpers/getUserFormPayload');

module.exports = {
  method: 'POST',
  path: '/editTransaction',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({ message: 'Token Expired' }).code(401);
    } else {
      const { userId } = userData;
      const queryObject = request.query;
      const typeOfRequest = Object.keys(queryObject);
      if (typeOfRequest[0] === 'delete') {
        deleteTransaction(userId, queryObject[typeOfRequest[0]]).then((reply) => {
          if (reply === 'transaction deleted') {
            response(reply).code(200);
          } else {
            response(reply).code(409);
          }
        });
      } else {
        const payload = getUserFormPayload(request);
        const { quantity } = payload;
        const { coin } = payload;
        const { price } = payload;
        editTransaction(userId, queryObject[typeOfRequest[0]], price, quantity, coin)
          .then((reply) => {
            if (reply === 'transaction edited') { response(reply).code(200); } else {
              response(reply).code(409);
            }
          });
      }
    }
  },
};

