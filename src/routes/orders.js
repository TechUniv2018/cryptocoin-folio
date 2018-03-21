const orderBooks = require('../handlers/orderBooks');

module.exports = [
  {
    method: 'GET',
    path: '/orders/{coin}',
    handler: (request, response) => {
      const coinSent = request.params.coin;
      response(orderBooks(coinSent));
    },
  },
];
