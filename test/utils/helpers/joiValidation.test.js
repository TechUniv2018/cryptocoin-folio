const joiValidation = require('../../../src/utils/helpers/joiValidation');

describe('Test for signup API with invalid data', () => {
  test('Should pass for invalid mobile number', () => {
    const options = {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 987654321,
    };
    expect(joiValidation(options)).toBe(false);
  });
});
