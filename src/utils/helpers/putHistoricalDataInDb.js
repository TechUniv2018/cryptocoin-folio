const Models = require('./../../../models');
const formatHistoricalDataForInsert = require('./formatHistoricalDataForInsert');

module.exports = (resultArray) => {
  const coinsInserPromiseArray = [];
  resultArray.forEach((coin) => {
    const { coinId } = coin;
    const coinPricesArray = coin.result.Data;
    const formattedCoinPriceArray = formatHistoricalDataForInsert(coinPricesArray, coinId);
    formattedCoinPriceArray.forEach((formattedCoinPriceData) => {
      coinsInserPromiseArray.push(Models.prices.upsert(formattedCoinPriceData));
    });
  });
  return coinsInserPromiseArray;
};
