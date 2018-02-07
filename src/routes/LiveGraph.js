const fetchCoinValues = require('../handlers/LiveGraph');

module.exports = [{
  path: '/LiveGraph',
  method: 'GET',
  handler: (request, response) => {
    fetchCoinValues().then((prices) => {
      response(prices).code(200);
    });
  },
}];

