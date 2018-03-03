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

  test('Response should contain 50 cryptocoins data', (done) => {
    const options = {
      method: 'GET',
      url: '/prices',
    };
    const coinsCount = (payload) => {
      const coinsLength = (JSON.parse(payload)).length;
      return coinsLength;
    };
    Server.inject(options, (response) => {
      expect(coinsCount(response.payload)).toBe(50);
      done();
    });
  });

  test('Response should contain price, volume and change', (done) => {
    const options = {
      method: 'GET',
      url: '/prices',
    };
    const coinsDetails = (payload) => {
      const payloadJson = JSON.parse(payload);
      const coins = Object.keys(payloadJson);
      let countForPrice = 0;
      let countForVolume = 0;
      let countForChange = 0;
      for (let i = 0; i < coins.length; i += 1) {
        if (payloadJson[i].Price) {
          countForPrice += 1;
        }
        if ((payloadJson[i].Volume) !== null) {
          countForVolume += 1;
        }
        if ((payloadJson[i].Change) !== null) {
          countForChange += 1;
        }
      }
      if (countForChange === 50 && countForPrice === 50 && countForVolume === 50) {
        return true;
      }
      return false;
    };
    Server.inject(options, (response) => {
      expect(coinsDetails(response.payload)).toBe(true);
      done();
    });
  });
});
