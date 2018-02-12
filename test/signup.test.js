const Server = require('../index.js');

const options = {
  method: 'POST',
  url: '/signup',
};

describe('Test for signup API with valid data', () => {
  options.payload = {
    fullName: 'Jack Mark',
    email: 'jackmark@alibababa.com',
    password: 'sample',
    confirmPassword: 'sample',
    mobileNumber: 9876543210,
  };
  test('Response code should be 200 for valid signup API call', (done) => {
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Response message should be valid input for valid signup API call', (done) => {
    Server.inject(options, (response) => {
      expect(response.result).toBe('Valid Input');
      done();
    });
  });
});

describe('Test for signup API with invalid data', () => {
  test('Should pass for invalid mobile number', (done) => {
    options.payload = {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumber: 987654321,
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      expect(response.result).toBe('Invalid Input');
      done();
    });
  });
  test('Should pass for invalid full name', (done) => {
    options.payload = {
      fullName: 123456,
      email: 'jackmark@alibababa.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumber: 9876543210,
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      expect(response.result).toBe('Invalid Input');
      done();
    });
  });
  test('Should pass for invalid email', (done) => {
    options.payload = {
      fullName: 'Jack Mark',
      email: 'jackmark$gmail.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumber: 9876543210,
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      expect(response.result).toBe('Invalid Input');
      done();
    });
  });
});
