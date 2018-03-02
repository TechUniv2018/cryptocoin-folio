const fetchCoinValues = require('../handlers/liveGraph');
const checkPresence = require('../utils/helpers/checkPresence');
const objToArr = require('../utils/helpers/objToArr');
const { coins } = require('../utils/constants');

module.exports = [{
  path: '/liveGraph',
  method: 'GET',
  handler: (request, response) => {
    const coin = request.query.coin || 'BTC';
    if (!checkPresence(coins, coin)) {
      response('InValid Coin').code(422);
    } else {
      fetchCoinValues(coin)
        .then((prices) => {
          response(objToArr(prices)).code(200);
        })
        .catch(() => response('500: Internal Server Error').code(500));
    }
  },
}];
