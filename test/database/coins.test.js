const Models = require('../../models');

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
    Models.coins.destroy({ where: { id: 1 }, cascade: true }).then(() => {
      Models.coins.findAll().then((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });
});
