const formatHistoricalDataForInsert = require('../../../src/utils/helpers/formatHistoricalDataForInsert');

describe('Format Historical Data For Insert', () => {
  test('should return result in required format', (done) => {
    const initalData = [{
      time: 1520215260,
      high: 0.00008709,
      low: 0.00008707,
      open: 0.00008708,
      volumefrom: 273350.11,
      volumeto: 23.79,
      close: 0.00008709,
    },
    {
      time: 1520215320,
      high: 0.00008711,
      low: 0.00008709,
      open: 0.00008709,
      volumefrom: 133796.08,
      volumeto: 11.6,
      close: 0.0000871,
    }];

    const formattedData = [{
      timeStamp: '1520215260',
      coinId: 2,
      high: 0.00008709,
      low: 0.00008707,
      open: 0.00008708,
      volume: 23.79,
      close: 0.00008709,
    },
    {
      timeStamp: '1520215320',
      coinId: 2,
      high: 0.00008711,
      low: 0.00008709,
      open: 0.00008709,
      volume: 11.6,
      close: 0.0000871,
    }];

    const formattedResult = formatHistoricalDataForInsert(initalData, 2);
    expect(formattedResult).toEqual(formattedData);
    done();
  });
});
