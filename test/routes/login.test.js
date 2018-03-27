const Server = require('../../index.js');
const Models = require('../../models/');

describe('Test for login API with valid data', () => {
  beforeAll((done) => {
    const options = {
      method: 'POST',
      url: '/signup',
      payload: {
        fullName: 'Jack Mark',
        email: 'jackmark@alibababa.com',
        password: 'sample',
        confirmPassword: 'sample',
        mobileNumbe: 9876543210,
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(201);
      done();
    });
  });
  afterAll((done) => {
    Models.users.destroy({
      truncate: true,
      cascade: true,
    }).then(() => {
      done();
    }).catch(console.log);
  });

  test('Should login with valid user data', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        email: 'jackmark@alibababa.com',
        password: 'sample',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.code).toBe(200);
      expect(response.result.message).toBe('Logged in');
      done();
    });
  });

  test('The route should respond with the object containing keys: "token", "code", "message", "username" for a valid user', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        email: 'jackmark@alibababa.com',
        password: 'sample',
      },
    };
    Server.inject(options, (response) => {
      expect(Object.keys(response.result)).toEqual(['code', 'token', 'message', 'username', 'userId']);
      done();
    });
  });
  test('The route should respond with the "User Not Registered" for an unregistered user', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        email: 'unregistered@alibababa.com',
        password: 'unregistered',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Invalid Request');
      done();
    });
  });
  test('The route should respond with the "Invalid Password" if wrong password is entered for existing user', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        email: 'jackmark@alibababa.com',
        password: 'wrongPassWoRd',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Invalid Request');
      done();
    });
  });
});
