const Models = require('../../models');

describe('test user table', () => {
  beforeAll((done) => {
    Models.users.destroy({
      truncate: true,
      cascade: true,
    }).then(() => {
      done();
    }).catch(console.log);
  });
  test('test users table is created', (done) => {
    Models.users.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });
});
