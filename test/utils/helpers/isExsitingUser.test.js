const isExsitingUser = require('../../../src/utils/helpers/isExsitingUser');

describe('Test for isExsitingUser helper function', () => {
  test('Should return true for new user', (done) => {
    const options = 'jackmark@alibababa.com';
    isExsitingUser(options).then((message) => {
      expect(message).toBe(false);
      done();
    });
  });
});
