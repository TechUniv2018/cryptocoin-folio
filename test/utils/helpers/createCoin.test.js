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
    const options = {
      symbol: '$',
      name: 'bitcoin',
    };
    createCoin(options.symbol, options.name)
      .then((message) => {
        expect(Object.keys(message).sort()).toEqual(['id', 'name', 'symbol', 'createdAt', 'updatedAt'].sort());
        done();
      });
  });
});
