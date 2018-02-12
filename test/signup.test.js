// const signup = require('../src/routes/signup');
const Server = require('../index.js');

describe('Test for signup API with valid data', () => {
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

  test('Response code should be 200 for valid signup API call', (done) => {
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Response code should be 200 for valid signup API call', (done) => {
    Server.inject(options, (response) => {
      expect(response.result).toBe('Valid Input');
      done();
    });
  });
});

describe('Test for signup API with invalid data', () => {
  const options = {
    method: 'POST',
    url: '/signup',
    payload: {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumber: 987654321,
    },
  };

  test('Response code should be 200 for valid signup API call', (done) => {
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});
