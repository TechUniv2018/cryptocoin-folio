const joiLoginValidation = require('../../../src/utils/helpers/joiLoginValidation');

describe('Test for login Joi Validation', () => {
  test('Should pass valid login data', () => {
    const options = {
      email: 'jackmark@alibababa.com',
      password: 'sample',
    };
    expect(joiLoginValidation(options)).toBe(true);
  });
});
