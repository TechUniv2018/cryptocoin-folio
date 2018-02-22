const objToArr = require('../../../src/utils/helpers/objToArr');

describe('Testing the ObjToArr function', () => {
  test('The function should return an array', () => {
    const objArr = [{
      time: 12345,
      high: 1928,
      low: 0,
      open: 0,
      close: 233,
      volumeto: 12223,
    }];
    expect(typeof objToArr(objArr)).toBe(typeof {});
  });
});

