const Models = require('../../models');

const cleanUpAllTables = () => [Models.prices.destroy({ cascade: true, truncate: true }),
  Models.transactions.destroy({ cascade: true, truncate: true }),
  Models.coins.destroy({ cascade: true, truncate: true }),
  Models.users.destroy({ cascade: true, truncate: true })];

describe('test coin table', () => {
  test('test coins table is created', (done) => {
    Models.coins.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  test('insert coin into coins table', (done) => {
    const coinObj = {
      symbol: 'BTC',
      name: 'Bitcoin',
    };

    Models.coins.create(coinObj).then((result) => {
      const resultCoinObject = {
        symbol: result.dataValues.symbol,
        name: result.dataValues.name,
      };
      expect(resultCoinObject).toEqual(coinObj);
      done();
    });
  });

  test('delete coin from coins table', (done) => {
    Models.coins.destroy({ where: { symbol: 'BTC' }, cascade: true }).then(() => {
      Models.coins.findAll().then((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  beforeAll((done) => {
    Promise.all(cleanUpAllTables()).then(() => {
      done();
    });
  });

  afterAll((done) => {
    Promise.all(cleanUpAllTables()).then(() => {
      done();
    });
  });
});
