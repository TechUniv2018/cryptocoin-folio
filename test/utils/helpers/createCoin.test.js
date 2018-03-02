const createCoin = require('../../../src/utils/helpers/createCoin');
const Models = require('../../../models/');

describe('Test for create coin function', () => {
  afterAll((done) => {
    Models.coins.destroy({
      truncate: true,
      cascade: true,
    }).then(() => {
      done();
    }).catch(console.log);
  });
  test('Should store data in coin table', (done) => {
    const coin = {
      symbol: '$',
      name: 'bitcoin',
    };
    createCoin(coin)
      .then((message) => {
        expect(Object.keys(message).sort()).toEqual(['id', 'name', 'symbol', 'createdAt', 'updatedAt'].sort());
        done();
      });
  });
});
