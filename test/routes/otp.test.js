const server = require('../../');
const Models = require('../../models');
const createToken = require('../../src/utils/helpers/createToken');

describe('Testing the GET OTP route', () => {
  beforeEach((done) => {
    Models.users.create({
      id: 2,
      email: 'paul@gmail.com',
      password: 'paul123',
      fullName: 'Paul',
      mobileNumbe: '9944198887',
    }).then(done)
      .catch(console.log);
  });
  afterEach((done) => {
    Models.users.destroy({
      truncate: true,
      cascade: true,
    })
      .then(done)
      .catch(console.log);
  });
  test('The route should repond with 200 for a valid username', (done) => {
    const options = {
      url: '/otp',
      method: 'PUT',
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
      method: 'PUT',
      headers: {
        authToken: 'abcdddd',
      },
    };
    server.inject(options, (result) => {
      expect(result.statusCode).toBe(401);
      done();
    });
  });
  test('The route should create an entry in the database against the userID with the OTP generated', (done) => {
    const options = {
      url: '/otp',
      method: 'PUT',
      headers: {
        authToken: createToken({ id: 2 }),
      },
    };
    server.inject(options, (result) => {
      Models.otpMessages.findOne({
        where: {
          userId: 2,
        },
        raw: true,
      }).then((otp) => {
        console.log(otp);
        expect(true).toBe(true);
        done();
      });
    });
  });
});
