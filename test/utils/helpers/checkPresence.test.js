const checkPresence = require('../../../src/utils/helpers/checkPresence');

describe('Testing the checkPresence helper function', () => {
  test('The function should return a boolean type', () => {
    const arrToBeScanned = [1, 2, 3];
    const element = 3;
    expect(typeof checkPresence(arrToBeScanned, element)).toBe(typeof true);
  });
  test('The function should return true if the element is part of the array', () => {
    const arrToBeScanned = [1, 2, 3];
    const element = 3;
    expect(checkPresence(arrToBeScanned, element)).toBe(true);
  });
  test('The function should return false if the element is not a part of the array', () => {
    const arrToBeScanned = [1, 2, 3];
    const element = 4;
    expect(checkPresence(arrToBeScanned, element)).toBe(false);
  });
});
