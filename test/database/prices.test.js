const Models = require('../../models');

describe('test price table', () => {
  test('test prices table is created', (done) => {
    Models.prices.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });
});
