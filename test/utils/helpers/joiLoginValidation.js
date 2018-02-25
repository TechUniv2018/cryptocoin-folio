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
});
