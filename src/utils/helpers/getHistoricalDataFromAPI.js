const EXTERNAL_LINKS = require('./../constants/externalLinks');
const rp = require('request-promise');

module.exports = (coinObj) => {
  const options = {
    url: EXTERNAL_LINKS.EXTERNAL_PRICE_HIST_MIN,
    method: 'get',
    qs: {
      fsym: 'USD',
      tsym: coinObj.symbol,
    },
  };
  return rp(options);
};

