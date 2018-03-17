const getTrans = require('../../../src/utils/helpers/getTransactionsForTransfers');

describe('Testing the get transfers function', () => {
  test('the function should return a promise', () => {
    expect(getTrans(1)).toBeInstanceOf(Promise);
  });
});

