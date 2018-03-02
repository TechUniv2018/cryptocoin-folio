const Server = require('../../index');


describe('testing server', () => {
  test('Response code should be 200', (done) => {
    const options = {
      method: 'GET',
      url: '/orders/BTC',
    };

    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
