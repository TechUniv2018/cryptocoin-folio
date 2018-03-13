const EXTERNAL_LINKS = require('./../constants/externalLinks');
const rp = require('request-promise');

module.exports = (coinsArray) => {
  const priceRequestPromisesArray = [];
  coinsArray.forEach((coinObj) => {
    const options = {
      url: EXTERNAL_LINKS.EXTERNAL_PRICE_HIST_HOUR,
      method: 'get',
      qs: {
        tsym: 'USD',
        fsym: coinObj.symbol,
        limit: 2000,
      },
    };
    console.log(options);
    priceRequestPromisesArray
      .push(rp(options)
        .then(result => (
          {
            result: JSON.parse(result),
            coinId: coinObj.id,
          })));
  });
  return priceRequestPromisesArray;
};

