const joiLoginValidation = require('../../../src/utils/helpers/joiLoginValidation');

describe('Test for login Joi Validation', () => {
  test('Should pass valid login data', () => {
    const options = {
      email: 'jackmark@alibababa.com',
      password: 'sample',
    };
    expect(joiLoginValidation(options)).toBe(true);
  });
  test('Should pass for invalid email', () => {
    const options = {
      email: 'jackmark$gmail.com',
      password: 'sample',
    };
    expect(joiLoginValidation(options)).toBe(false);
  });
  test('Should pass for empty password', () => {
    const options = {
      email: 'jackmark@gmail.com',
      password: '',
    };
    expect(joiLoginValidation(options)).toBe(false);
  });
  test('Should pass for empty email', () => {
    const options = {
      email: '',
      password: 'abcd',
    };
    expect(joiLoginValidation(options)).toBe(false);
  });
});
