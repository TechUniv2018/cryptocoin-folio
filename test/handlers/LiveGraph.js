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
});

