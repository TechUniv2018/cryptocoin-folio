const EXTERNAL_URLS = require('../externalLinks');
const rp = require('request-promise');

module.exports = [
  {
    method: 'GET',
    path: '/prices',
    handler: (request, response) => {
      rp(EXTERNAL_URLS.EXTERNAL_LIVE_PRICE_DETAIL).then((body) => {
        response(JSON.parse(body).RAW);
      });
    },
  },
];
