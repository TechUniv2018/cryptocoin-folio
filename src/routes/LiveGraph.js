const fetchCoinValues = require('../handlers/LiveGraph');

module.exports = [{
  path: '/LiveGraph',
  method: 'GET',
  handler: (request, response) => {
    const coin = 'BTC' || request.query.coin;
    fetchCoinValues(coin).then((prices) => {
      response(prices).code(200);
    });
  },
}];

