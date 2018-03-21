const getCoinsArrayforSeed = require('./../../../src/utils/helpers/getCoinsArrayforSeed');

describe('check getCoinsArrayforSeed function', () => {
  test('should return a array', () => {
    const coinsArray = getCoinsArrayforSeed();
    expect(coinsArray).toBeInstanceOf(Array);
  });

  test('should return a array of length 50', () => {
    const coinsArray = getCoinsArrayforSeed();
    expect(coinsArray.length).toBe(50);
  });
});

