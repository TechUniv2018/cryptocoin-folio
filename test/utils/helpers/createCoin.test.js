const createCoin = require('../../../src/utils/helpers/createCoin');
const createNewUser = require('../../../src/utils/helpers/createNewUser');
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
    createCoin(options)
      .then((message) => {
        expect(message).toBe('OK');
        done();
      });
  });
});
