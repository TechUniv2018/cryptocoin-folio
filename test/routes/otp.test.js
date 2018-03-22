const server = require('../../');
const Models = require('../../models');
const createToken = require('../../src/utils/helpers/createToken');

describe('Testing the GET OTP route', () => {
  test('The route should repond with 200 for a valid username', (done) => {
    const options = {
      url: '/otp',
      method: 'GET',
      headers: {
        authToken: createToken({ id: 2 }),
      },
    };
    server.inject(options, (result) => {
      expect(result.statusCode).toBe(200);
      done();
    });
  });
  test('The route should respond with a 401 if the user is not logged in', (done) => {
    const options = {
      url: '/otp',
      method: 'GET',
      headers: {
        authToken: 'abcdddd',
      },
    };
    server.inject(options, (result) => {
      expect(result.statusCode).toBe(401);
      done();
    });
  });
});
