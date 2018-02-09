const formatFunction = require('../../src/utils/helpers/liveDataApiFormatting');

const apiToBeFormatted = '{ "RAW": { "BTC": { "USD":  { "PRICE": "4", "VOLUME24HOUR": "5", "CHANGEPCT24HOUR": "6" , "OPENDAY": 7592.32,"HIGHDAY": 8209.37,"LOWDAY": 7590.48,"OPEN24HOUR": 7500.72}}}}';

// console.log(r.RAW.USD);
describe('Checking for the use case of the function liveDataApiFormatting', () => {
  test('checking if the returned value is an object', () => {
    expect(typeof (formatFunction(apiToBeFormatted))).toBe('object');
  });
  test('checking if the returned value is an object', () => {
    expect(formatFunction(apiToBeFormatted)).toEqual({ BTC: { Change: 6, Price: 4, Volume: 5 } });
  });
});
