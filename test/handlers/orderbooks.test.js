const orderBooks = require('../../src/handlers/orderBooks');

describe('testing the orderbooks function', () => {
  test('the function should return an object when BTC is supplied', () => {
    orderBooks('BTC').then(data => expect(typeof data).toBe('object'));
  });
  test('the function should return an object when any other coin is supplied other than btc', () => {
    orderBooks('LTC').then(data => expect(typeof data).toBe('object'));
  });
  test('the function should return an object with two keys for BTC', (done) => {
    orderBooks('BTC').then((data) => {
      expect((Object.keys(data)).length).toBe(2);
      done();
    });
  });
});
