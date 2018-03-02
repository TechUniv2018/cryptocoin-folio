const orderBooks = require('../../src/handlers/orderBooks');

describe('testing the orderbooks function', () => {
  test('the function should return an object', () => {
    expect(typeof orderBooks('BTC')).toBe('object');
  });
});
