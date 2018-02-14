const Server = require('../../index');

describe('Testing the LiveGraph API', () => {
  test('The route should return a 200 success code', (done) => {
    Server.inject('/liveGraph', (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('The route should respond with a 404 for all other requests', (done) => {
    const options = {
      url: '/liveGraph',
      method: 'POST',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
  test('The route should return an Array', (done) => {
    Server.inject('/liveGraph?coin=BTC', (response) => {
      expect(typeof response.result).toBe(typeof []);
      done();
    });
  });
  test('The rouet should respond with a 422 for invalid coin', (done) => {
    Server.inject('/liveGraph?coin=STR', (response) => {
      expect(response.statusCode).toBe(422);
      done();
    });
  });
});

