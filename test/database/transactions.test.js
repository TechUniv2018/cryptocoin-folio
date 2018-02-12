const Models = require('../../models');

describe('test transaction table', () => {
  test('test transactions table is created', (done) => {
    Models.transactions.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });
});
