const putHistoricalDataInDb = require('../utils/helpers/putHistoricalDataInDb');
const getCoinsFromDb = require('./../utils/helpers/getCoinsFromDb');
const getHistoricalDataFromAPI = require('./../utils/helpers/getHistoricalDataFromAPI');
const formatHistoricalDataForInsert = require('./../utils/helpers/formatHistoricalDataForInsert');

module.exports = [
  {
    method: 'PUT',
    path: '/historicalData',
    handler: (request, response) => {
      const coinsPromise = getCoinsFromDb();
      // coinsPromise.then((coinArray) => {
      //   coinArray.forEach((coin) => {
      //     getHistoricalDataFromAPI(coin).then((pricesData) => {
      //       const formattedPricesData = formatHistoricalDataForInsert(pricesData, coin.id);
      //       formattedPricesData.forEach((eachPriceData) => {
      //         putHistoricalDataInDb;
      //       });
      //     });
      //   });
      // });
    },
  },
];
