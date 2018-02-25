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
