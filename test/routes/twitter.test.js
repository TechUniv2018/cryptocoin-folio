const server = require('../../');

describe('Testing the twitter API', () => {
  test('The function should respond with a 200 OK', (done) => {
    server.inject('/twitter/BTC', (result) => {
      expect(result.statusCode).toBe(200);
      done();
    });
  });
  test('The route should respond with an array', (done) => {
    server.inject('/twitter/NEO', (result) => {
      expect(result.result).toBeInstanceOf(Array);
      done();
    });
  });
  test('The route should respond with an array of objects', (done) => {
    server.inject('/twitter/XRP', (result) => {
      expect(result.result[0]).toBeInstanceOf(Object);
      done();
    });
  });
  test('The objects that the route responds with should have the keys "fullName", "content", "screenName", "profPic"', (done) => {
    server.inject('/twitter/ETH', (result) => {
      expect(Object.keys(result.result[0])).toEqual(['fullName', 'content', 'screenName', 'profPic']);
      done();
    });
  });
});

