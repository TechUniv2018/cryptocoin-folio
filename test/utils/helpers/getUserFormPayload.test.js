const getUserFormPayload = require('../../../src/utils/helpers/getUserFormPayload');

describe('Test for getUserFormPayload helper function', () => {
  test('Should return user data object', (done) => {
    const options = {};
    options.payload = {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample12',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    expect(typeof getUserFormPayload(options)).toBe('object');
    done();
  });
  test('Should return user data object from string', (done) => {
    const options = {};
    options.payload = JSON.stringify({
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample12',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    });
    expect(typeof getUserFormPayload(options)).toBe('object');
    done();
  });
  test('Should return user data object from string', (done) => {
    const options = {};
    options.payload = {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample12',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    expect(Object.keys(getUserFormPayload(options)))
      .toEqual(['fullName', 'email', 'password', 'confirmPassword', 'mobileNumbe']);
    done();
  });
});
