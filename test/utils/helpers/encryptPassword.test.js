const encryptPassword = require('../../../src/utils/helpers/encryptPassword');

describe('Test for encryptedPassword helper function', () => {
  test('Should change plaintext', (done) => {
    const options = 'thisispassword';
    expect(encryptPassword(options)).not.toBe(options);
    done();
  });
});
