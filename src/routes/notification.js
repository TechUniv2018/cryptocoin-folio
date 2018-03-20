const getJWTpayload = require('../utils/helpers/getJWTpayload');
const getNotification = require('../utils/helpers/getNotification');

module.exports = {
  method: 'GET',
  path: '/notification',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      Response({ message: 'Token Expired' }).code(401);
    } else {
      const { userId } = userData;
      getNotification(userId)
        .then((notifications) => {
          response(notifications).code(200);
        });
    }
  },
};

