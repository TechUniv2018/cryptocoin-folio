const putHistoricalDataInDb = require('../utils/helpers/putHistoricalDataInDb');
const getCoinsFromDb = require('./../utils/helpers/getCoinsFromDb');
const getHistoricalDataFromAPI = require('./../utils/helpers/getHistoricalDataFromAPI');
const Models = require('../../models');

module.exports = [
  {
    method: 'PUT',
    path: '/historicalData',
    handler: (request, response) => {
      const coinsPromise = getCoinsFromDb();
      const coinsHistoricalDataPromise = coinsPromise
        .then(coinsArray => Promise.all(getHistoricalDataFromAPI(coinsArray)));
      const historicalDataInDb = coinsHistoricalDataPromise
        .then(resultArray => Promise.all(putHistoricalDataInDb(resultArray)));
      historicalDataInDb.then(() => {
        response('Done');
      });
    },
  },
  {
    path: '/historicalData',
    method: 'GET',
    handler: (request, response) => {
      const coin = request.query.coin || 'BTC';
      Models.prices.findAll({
        attributes: ['timeStamp', 'open', 'close', 'high', 'low'],
        where: { coinId: 16 },
        raw: true,
        order: [['timeStamp', 'ASC']],
      }).then((priceResult) => {
        const priceArray = priceResult.map(price => Object.values(price));
        Models.prices.findAll({
          attributes: ['timeStamp', 'volume'],
          where: { coinId: 16 },
          raw: true,
          order: [['timeStamp', 'ASC']],
        }).then((volumeResult) => {
          const volumeArray = volumeResult.map(price => Object.values(price));
          for (let i = 0; i < volumeArray.length; i += 1) {
            priceArray[i][0] = Number(priceArray[i][0]) * 1000;
            volumeArray[i][0] = Number(volumeArray[i][0]) * 1000;
          }
          response({ price: priceArray, volume: volumeArray });
        });
      });
    },
  },
];

