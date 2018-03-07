const getHistoricalDataFromAPI = require('./../../../src/utils/helpers/getHistoricalDataFromAPI');

describe('', () => {
  test('test for a coin array it reutrns array', (done) => {
    const coinsArray = [{
      id: 64,
      symbol: 'BTC',
      name: 'Bitcoin',
      createdAt: '2018-03-07T17:16:31.539Z',
      updatedAt: '2018-03-07T17:16:31.539Z',
    }];

    const coinsHistoricalDataPromise = Promise.all(getHistoricalDataFromAPI(coinsArray));
    coinsHistoricalDataPromise.then((result) => {
      expect(result).toBeInstanceOf(Array);
      done();
    });
  });

  test('test array length is 2', (done) => {
    const coinsArray = [{
      id: 64,
      symbol: 'BTC',
      name: 'Bitcoin',
      createdAt: '2018-03-07T17:16:31.539Z',
      updatedAt: '2018-03-07T17:16:31.539Z',
    }, {
      id: 115,
      symbol: 'ETH',
      name: 'Ethereum',
      createdAt: '2018-03-07T17:25:12.765Z',
      updatedAt: '2018-03-07T17:25:12.765Z',
    }];

    const coinsHistoricalDataPromise = Promise.all(getHistoricalDataFromAPI(coinsArray));
    coinsHistoricalDataPromise.then((result) => {
      expect(result.length).toBe(2);
      done();
    });
  });

  test('test result item contains result and coinId', (done) => {
    const coinsArray = [{
      id: 64,
      symbol: 'BTC',
      name: 'Bitcoin',
      createdAt: '2018-03-07T17:16:31.539Z',
      updatedAt: '2018-03-07T17:16:31.539Z',
    }, {
      id: 115,
      symbol: 'ETH',
      name: 'Ethereum',
      createdAt: '2018-03-07T17:25:12.765Z',
      updatedAt: '2018-03-07T17:25:12.765Z',
    }];

    const coinsHistoricalDataPromise = Promise.all(getHistoricalDataFromAPI(coinsArray));
    coinsHistoricalDataPromise.then((result) => {
      expect(Object.keys(result[0].result)).toEqual(['result', 'coinId']);
      done();
    });
  });

  test('result[0].result should contain proper response', (done) => {
    const coinsArray = [{
      id: 64,
      symbol: 'BTC',
      name: 'Bitcoin',
      createdAt: '2018-03-07T17:16:31.539Z',
      updatedAt: '2018-03-07T17:16:31.539Z',
    }, {
      id: 115,
      symbol: 'ETH',
      name: 'Ethereum',
      createdAt: '2018-03-07T17:25:12.765Z',
      updatedAt: '2018-03-07T17:25:12.765Z',
    }];

    const coinsHistoricalDataPromise = Promise.all(getHistoricalDataFromAPI(coinsArray));
    coinsHistoricalDataPromise.then((a) => {
      expect(Object.keys(a[0].result)).toEqual(['Response', 'Type', 'Aggregated', 'Data', 'TimeTo', 'TimeFrom', 'FirstValueInArray', 'ConversionType']);
      done();
    });
  });
});

