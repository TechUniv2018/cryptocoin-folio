const getTransactions = require('../utils/helpers/getTransactions');
const getJWTpayload = require('../utils/helpers/getJWTpayload');

module.exports = {
  method: 'GET',
  path: '/portfolio',
  handler: (Request, Response) => {
    // console.log(Request);
    const userData = getJWTpayload(Request);
    if (userData.message === 'token expired') {
      Response({ message: 'Token Expired' }).code(401);
    } else {
      const { userId } = userData;
      const userTransactions = getTransactions(userId);
      userTransactions.then(data => Response(data).code(200))
        .catch(() => Response('Error Occured').code(500));
    }
  },
};

