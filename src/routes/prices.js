const EXTERNAL_URLS = require('../utils/constants').externalLinks;
const rp = require('request-promise');
const liveDataApiFormatting = require('../utils/helpers/liveDataApiFormatting');

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
