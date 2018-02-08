const Server = require('../../index');

describe('testing server', () => {
  test('Response code should be 200', (done) => {
    const options = {
      method: 'GET',
      url: '/prices',
    };

    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Response should contain 10 cryptocoins data', (done) => {
    const options = {
      method: 'GET',
      url: '/prices',
    };
    const coinsCount = (payload) => {
      const coins = Object.keys(JSON.parse(payload));
      return coins.length;
    };
    Server.inject(options, (response) => {
      expect(coinsCount(response.payload)).toBe(10);
      done();
    });
  });
});
