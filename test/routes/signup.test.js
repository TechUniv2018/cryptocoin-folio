const Server = require('../../index.js');
const Models = require('../../models/');

const options = {
  method: 'POST',
  url: '/signup',
};

describe('Test for signup API with valid data', () => {
  afterAll((done) => {
    Models.users.destroy({
      truncate: true,
      cascade: true,
    }).then(() => {
      done();
    }).catch(console.log);
  });
  options.payload = {
    fullName: 'Jack Mark',
    email: 'jackmark@alibababa.com',
    password: 'sample',
    confirmPassword: 'sample',
    mobileNumbe: 9876543210,
  };
  test('Should store data in user table', (done) => {
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(201);
      expect(response.result).toBe('User Registered Successfully');
      done();
    });
  });
});

describe('Checking idempotency', () => {
  options.payload = {
    fullName: 'Jack Mark',
    email: 'jackmark@alibababa.com',
    password: 'sample',
    confirmPassword: 'sample',
    mobileNumbe: 9876543210,
  };
  beforeAll((done) => {
    Models.users.create(options.payload).then(() => {
      done();
    }).catch(console.log);
  });
  afterAll((done) => {
    Models.users.destroy({
      truncate: true,
      cascade: true,
    }).then(() => {
      done();
    }).catch(console.log);
  });
  test('Should pass for already registered user', (done) => {
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(409);
      expect(response.result).toBe('User Already Registered');
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
      mobileNumbe: 987654321,
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(422);
      expect(response.result).toBe('Invalid User Data');
      done();
    });
  });
  test('Should pass for invalid full name', (done) => {
    options.payload = {
      fullName: 123456,
      email: 'jackmark@alibababa.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(422);
      expect(response.result).toBe('Invalid User Data');
      done();
    });
  });
  test('Should pass for invalid email', (done) => {
    options.payload = {
      fullName: 'Jack Mark',
      email: 'jackmark$gmail.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(422);
      expect(response.result).toBe('Invalid User Data');
      done();
    });
  });
  test('Should pass for invalid password', (done) => {
    options.payload = {
      fullName: 'Jack Mark',
      email: 'jackmark@gmail.com',
      password: 'abcd',
      confirmPassword: 'abcde',
      mobileNumbe: 9876543210,
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(422);
      expect(response.result).toBe('Invalid User Data');
      done();
    });
  });
  test('Should pass for invalid case sesitive password', (done) => {
    options.payload = {
      fullName: 'Jack Mark',
      email: 'jackmark@gmail.com',
      password: 'abcd',
      confirmPassword: 'abcD',
      mobileNumbe: 9876543210,
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(422);
      expect(response.result).toBe('Invalid User Data');
      done();
    });
  });
  test('Should pass for empty password', (done) => {
    options.payload = {
      fullName: 'Jack Mark',
      email: 'jackmark@gmail.com',
      password: '',
      confirmPassword: '',
      mobileNumbe: 9876543210,
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(422);
      expect(response.result).toBe('Invalid User Data');
      done();
    });
  });
});
