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
  test('Response should contain object for BTC', (done) => {
    const options = {
      method: 'GET',
      url: '/orders/BTC',
    };
    const coinsCount = (payload) => {
      const coins = Object.keys(JSON.parse(payload));
      return coins.length;
    };
    Server.inject(options, (response) => {
      expect(coinsCount(response.payload)).toBe(2);
      done();
    });
  });
  test('Response should contain object for other coins', (done) => {
    const options = {
      method: 'GET',
      url: '/orders/LTC',
    };
    const coinsCount = (payload) => {
      const coins = Object.keys(JSON.parse(payload));
      return coins.length;
    };
    Server.inject(options, (response) => {
      expect(coinsCount(response.payload)).toBe(2);
      done();
    });
  });
  test('Response code should be object for BTC', (done) => {
    const options = {
      method: 'GET',
      url: '/orders/BTC',
    };
    Server.inject(options, (response) => {
      expect(Object.keys(JSON.parse(response.payload)).length).toBe(2);
      done();
    });
  });
  test('Response code should be object for other coins', (done) => {
    const options = {
      method: 'GET',
      url: '/orders/LTC',
    };
    Server.inject(options, (response) => {
      expect(Object.keys(JSON.parse(response.payload)).length).toBe(2);
      done();
    });
  });
});
