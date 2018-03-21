const encryptUserdData = require('../../../src/utils/helpers/encryptUserData');

describe('Test for encryptUserdData helper function', () => {
  test('Should return user data object', (done) => {
    const options = {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample12',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    expect(typeof encryptUserdData(options)).toBe('object');
    done();
  });
  test('Should return user data object', (done) => {
    const options = {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample12',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    expect(Object.keys(encryptUserdData(options))).toEqual(['fullName', 'email', 'mobileNumbe', 'password']);
    done();
  });
});
