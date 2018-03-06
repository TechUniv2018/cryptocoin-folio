const formatHistoricalDataForInsert = require('./formatHistoricalDataForInsert');

const Models = require('./../../../models');

module.exports = (historicalDataInDb) => {
  const priceModelInsertPromiseArray = [];
  historicalDataInDb.forEach((result, coinId) => {
    console.log(`>>>>>  INSERTING  >>>> ${coinId}`);
    const formattedData = formatHistoricalDataForInsert(result.Data, coinId);
    formattedData.forEach((data) => {
      priceModelInsertPromiseArray.push(Models.price.upsert(data));
    });
  });
  return priceModelInsertPromiseArray;
};

