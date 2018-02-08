const EXTERNAL_URLS = require('../externalLinks');
const rp = require('request-promise');
const liveDataApiFormatting = require('../util/liveDataApiFormatting');

module.exports = [
  {
    method: 'GET',
    path: '/prices',
    handler: (request, response) => {
      rp(EXTERNAL_URLS.EXTERNAL_LIVE_PRICE_DETAIL).then((body) => {
        const editedDataJson = liveDataApiFormatting(body);
        response(editedDataJson);
      });
    },
  },
];
