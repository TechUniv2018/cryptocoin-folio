const getJWTpayload = require('../utils/helpers/getJWTpayload');
const getNotification = require('../utils/helpers/getNotification');
const markNotifications = require('../utils/helpers/markNotifications');

module.exports = [{
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
}, {
  method: 'PUT',
  path: '/notification',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      Response({ message: 'Token Expired' }).code(401);
    } else {
      const { userId } = userData;
      markNotifications(userId)
        .then((result) => {
          if (typeof result === typeof []) {
            response().code(204);
          } else {
            response({ message: 'Operation failed' }).code(500);
          }
        });
    }
  },
},
];

