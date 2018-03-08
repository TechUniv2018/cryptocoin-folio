const putHistoricalDataInDb = require('../utils/helpers/putHistoricalDataInDb');
const getCoinsFromDb = require('./../utils/helpers/getCoinsFromDb');
const getHistoricalDataFromAPI = require('./../utils/helpers/getHistoricalDataFromAPI');

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
];
