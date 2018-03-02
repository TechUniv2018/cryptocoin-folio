const orderBooks = require('../../src/handlers/orderBooks');

describe('testing the orderbooks function', () => {
  test('the function should return an object when BTC is supplied', (done) => {
    orderBooks('BTC').then(data => expect(typeof data).toBe('object'));
    done();
  });
  test('the function should return an object when any other coin is supplied other than btc', (done) => {
    orderBooks('LTC').then(data => expect(typeof data).toBe('object'));
    done();
  });
  test('the function should return an object with two keys for BTC', (done) => {
    orderBooks('BTC').then((data) => {
      expect((Object.keys(data)).length).toBe(2);
      done();
    });
  });
  test('the function should return an object with two keys for other coins', (done) => {
    orderBooks('LTC').then((data) => {
      expect((Object.keys(data)).length).toBe(2);
      done();
    });
  });
  test('the function should return an object with 3 keys for each item for BTC', (done) => {
    orderBooks('BTC').then((data) => {
      expect((Object.keys(data.asks[0]).length)).toBe(3);
      done();
    });
  });
});
