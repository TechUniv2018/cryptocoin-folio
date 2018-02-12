const Models = require('../../models');

describe('test coin table', () => {
  test('test coins table is created', (done) => {
    Models.coins.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });
});
