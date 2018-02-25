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
  test('Should pass for invalid full name', () => {
    const options = {
      fullName: 123456,
      email: 'jackmark@alibababa.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    expect(joiValidation(options)).toBe(false);
  });
  test('Should pass for invalid email', () => {
    const options = {
      fullName: 'Jack Mark',
      email: 'jackmark$gmail.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    expect(joiValidation(options)).toBe(false);
  });
});
