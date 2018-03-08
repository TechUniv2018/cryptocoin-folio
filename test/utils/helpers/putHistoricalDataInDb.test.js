const Models = require('./../../../models');
const putHistoricalDataInDb = require('./../../../src/utils/helpers/putHistoricalDataInDb');
const fs = require('fs');

describe('', () => {
  let coinPriceData = null;
  test('price table should contain 4 price', (done) => {
    fs.readFile('coinPriceDataTest.json', (err, data) => {
      coinPriceData = data;
      Promise.all(putHistoricalDataInDb(JSON.parse(coinPriceData))).then(() => {
        Models.prices.findAll().then((result) => {
          expect(result.length).toEqual(4);
          done();
        });
      });
    });
  });

  beforeEach((done) => {
    Models.prices.destroy({ cascade: true, truncate: true }).then(() => {
      Models.coins.destroy({ cascade: true, truncate: true }).then(() => {
        Models.coins.bulkCreate([{ id: 64, symbol: 'BTC', name: 'Bitcoin' }, { id: 115, symbol: 'ETH', name: 'Etherium' }]).then(() => {
          done();
        });
      });
    });
  });
});

