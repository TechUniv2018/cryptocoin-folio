const Models = require('../../models');

describe('test user table', () => {
  test('test users table is created', (done) => {
    Models.users.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });
});
