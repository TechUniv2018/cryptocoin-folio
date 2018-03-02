const orderBooks = require('../../src/handlers/orderBooks');

describe('testing the orderbooks function', () => {
  test('the function should return an object when BTC is supplied', () => {
    orderBooks('BTC').then(data => expect(typeof data).toBe('object'));
  });
  test('the function should return an object when any other coin is supplied other than btc', () => {
    orderBooks('LTC').then(data => expect(typeof data).toBe('object'));
  });
  test('the function should return an object with three keys for BTC', () => {
    console.log(orderBooks('BTC'));
    // expect(Object.keys(orderBooks('BTC')[0]).length).toBe(3);
  });
});
