const Server = require('../../index');

describe('Testing the LiveGraph API', () => {
  test('The route should return a 200 success code', (done) => {
    Server.inject('/LiveGraph', (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('The route should return an Array', (done) => {
    Server.inject('/LiveGraph?coin=BTC', (response) => {
      console.log(response.result);
      expect(typeof response.result).toBe(typeof []);
      done();
    });
  });
});

