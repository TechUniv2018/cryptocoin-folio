const LiveGraphHandler = require('../../src/handlers/LiveGraph');

describe('Testing the Live Graph Handler function', () => {
  test('The function must return a Promise', () => {
    expect(LiveGraphHandler('BTC')).toBeInstanceOf(Promise);
  });
  test('The function should return a resolved promise', (done) => {
    LiveGraphHandler().then(() => {
      expect(true).toBe(true);
      done();
    });
  });
  test('The function should return a promise resolved with an Array of length 1440', (done) => {
    LiveGraphHandler().then((prices) => {
      expect(prices.length).toBe(1440);
      done();
    });
  });
  test('The function should return a promise resolved with an array of objects with the required keys', (done) => {
    LiveGraphHandler().then((prices) => {
      const price = prices[0];
      expect(Object.keys(price)).toEqual(['time', 'close', 'high', 'low', 'open', 'volumefrom', 'volumeto']);
      done();
    });
  });
});
