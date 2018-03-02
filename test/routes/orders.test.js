const Server = require('../../index');


describe('testing server', () => {
  test('Response code should be 200 for BTC', (done) => {
    const options = {
      method: 'GET',
      url: '/orders/BTC',
    };

    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Response code should be 200 for other coins', (done) => {
    const options = {
      method: 'GET',
      url: '/orders/LTC',
    };

    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
