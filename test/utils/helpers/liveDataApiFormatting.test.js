const formatFunction = require('../../../src/utils/helpers/liveDataApiFormatting');

const apiToBeFormatted = '{ "RAW": { "BTC": { "USD":  { "PRICE": "4", "VOLUME24HOUR": "5", "CHANGEPCT24HOUR": "6" , "OPENDAY": 7592.32,"HIGHDAY": 8209.37,"LOWDAY": 7590.48,"OPEN24HOUR": 7500.72}}}}';

describe('Checking for the use case of the function liveDataApiFormatting', () => {
  test('checking if the returned value is an object', () => {
    expect(formatFunction(apiToBeFormatted)).toBeInstanceOf(Array);
  });
  test('checking if the keys of the object returned', () => {
    expect(formatFunction(apiToBeFormatted)).toEqual([{
      Symbol: 'BTC',
      Name: 'Bitcoin',
      Change: 6,
      Price: 4,
      Volume: 5,
    }]);
  });
  test('failure testcase', () => {
    const invalidInput = 'invalid input';
    expect(typeof formatFunction(invalidInput)).toBe(typeof '{}');
  });
  test('failure testcase', () => {
    const invalidInput = 'invalid input';
    expect(formatFunction(invalidInput)).toBe('invalid input');
  });
});
