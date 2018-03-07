const getCoinsFromDb = require('./../../../src/utils/helpers/getCoinsFromDb');
const coinsArray = require('./../../../src/utils/helpers/getCoinsArrayforSeed');
const Models = require('./../../../models');

describe('', () => {
  test('should return array', (done) => {
    expect(getCoinsFromDb().then((result) => {
      expect(result).toBeInstanceOf(Array);
      done();
    }));
  });

  test('array length should be 50', (done) => {
    expect(getCoinsFromDb().then((result) => {
      expect(result.length).toBe(50);
      done();
    }));
  });

  beforeAll((done) => {
    Models.coins.destroy({ cascade: true, truncate: true }).then(() => {
      Models.coins.bulkCreate(coinsArray()).then(() => {
        done();
      });
    });
  });
});

