const Models = require('../../models');

const cleanUpAllTables = () => [Models.prices.destroy({ cascade: true, truncate: true }),
  Models.transactions.destroy({ cascade: true, truncate: true }),
  Models.coins.destroy({ cascade: true, truncate: true }),
  Models.users.destroy({ cascade: true, truncate: true })];

describe('test price table', () => {
  test('test prices table is created', (done) => {
    Models.prices.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  test('insert price into price table should fail with Sequelize Foreign Key Constraint Error', (done) => {
    const priceObject = {
      timeStamp: '123',
      coinId: 1,
      open: 321.3213,
      close: 423.3243,
      high: 455.7565,
      low: 321.2131,
      volume: 3231.5423,
    };

    Models.prices.create(priceObject).then().catch((e) => {
      expect(e.name).toBe('SequelizeForeignKeyConstraintError');
      done();
    });
  });

  test('test prices table is still empty', (done) => {
    Models.prices.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  test('', (done) => {
    const coinObj = {
      symbol: 'BTC',
      name: 'Bitcoin',
    };

    Models.coins.create(coinObj).then((coinResult) => {
      const priceObject = {
        timeStamp: '123',
        coinId: coinResult.dataValues.id,
        open: 321.3213,
        close: 423.3243,
        high: 455.7565,
        low: 321.2131,
        volume: 3231.5423,
      };
      Models.prices.create(priceObject).then((priceResult) => {
        const resultPriceObject = {
          timeStamp: priceResult.dataValues.timeStamp,
          coinId: coinResult.dataValues.id,
          open: priceResult.dataValues.open,
          close: priceResult.dataValues.close,
          high: priceResult.dataValues.high,
          low: priceResult.dataValues.low,
          volume: priceResult.dataValues.volume,
        };
        expect(resultPriceObject).toEqual(priceObject);
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
