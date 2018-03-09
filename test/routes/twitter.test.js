const server = require('../../');

describe('Testing the twitter API', () => {
  test('The function should respond with a 200 OK', (done) => {
    server.inject('/twitter/BTC', (result) => {
      expect(result.result).toBe('BTC');
      done();
    });
  });
});

