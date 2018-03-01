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
      expect(response.statusCode).toBe(200);
      expect(response.result).toBe('log In Success');
      done();
    });
  });
});
