const verifyPassword = require('../../../src/utils/helpers/verifyPassword');
const encryptPassword = require('../../../src/utils/helpers/encryptPassword');

describe('Test for verifyPassword helper function', () => {
  let hashPassword;
  beforeAll(() => {
    hashPassword = encryptPassword('abcd');
  });
  test('Should return true for correct plain password', (done) => {
    expect(verifyPassword('abcd', hashPassword)).toBe(true);
    done();
  });

  test('Should return false for incorrect plain password', (done) => {
    expect(verifyPassword('abcde', hashPassword)).toBe(false);
    done();
  });
});
