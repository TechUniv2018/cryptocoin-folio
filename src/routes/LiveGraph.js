const fetchCoinValues = require('../handlers/LiveGraph');
const checkPresence = require('../utils/helpers/checkPresence');
const { coins } = require('../utils/constants');

module.exports = [{
  path: '/liveGraph',
  method: 'GET',
  handler: (request, response) => {
    const coin = request.query.coin || 'BTC';
    // console.log(coin);
    if (!checkPresence(coins, coin)) {
      response('InValid Coin').code(422);
    } else {
      fetchCoinValues(coin)
        .then((prices) => {
          response(prices).code(200);
        })
        .catch(() => response('500: Internal Server Error').code(500));
    }
  },
}];

