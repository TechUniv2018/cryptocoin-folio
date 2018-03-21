const createToken = require('../../../src/utils/helpers/createToken');

describe('Testing the createToken helper function: Function creates JWT token for authenticated user', () => {
  test('The function should return a string', () => {
    const user = {
      id: 1,
    };
    expect(typeof createToken(user)).toBe(typeof 'jiji');
  });
});
