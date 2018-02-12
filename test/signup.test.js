// const signup = require('../src/routes/signup');
const Server = require('../index.js');

describe('Test for signup API', () => {
  test('Response code should be 200 for valid signup API call', (done) => {
    const options = {
      method: 'POST',
      url: '/signup',
      payload: {
        fullName: 'Jack Mark',
        email: 'jackmark@alibababa.com',
        password: 'sample',
        confirmPassword: 'sample',
        mobileNumber: 9876543210,
      },
    };

    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
