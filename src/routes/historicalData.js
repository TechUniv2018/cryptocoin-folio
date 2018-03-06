const putHistoricalDataInDb = require('../utils/helpers/putHistoricalDataInDb');

module.exports = [
  {
    method: 'GET',
    path: '/historicalData',
    handler: (request, response) => {
      putHistoricalDataInDb();
    },
  },
];
