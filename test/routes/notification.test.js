const createUser = require('../../src/utils/helpers/createNewUser');
const createToken = require('../../src/utils/helpers/createToken.js');
const Models = require('../../models/');
const server = require('../../index');

describe('Test for notification route', () => {
  let authtoken;
  beforeAll((done) => {
    const user = {
      fullName: 'Bill Gates',
      email: 'billgates@microsoft.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    createUser(user)
      .then((details) => {
        console.log(details);
        const userdetails = {
          id: details.id,
        };
        authtoken = createToken(userdetails);
        return Models.notifications.create({
          userId: details.id,
          transactionId: 1,
          text: 'you have requested 10 btc from parth',
        });
      })
      .then(() => done());
  });
  afterAll((done) => {
    Models.notifications.destroy({
      truncate: true,
      cascade: true,
    }).then(() => {
      Models.users.destroy({
        truncate: true,
        cascade: true,
      }).then(() => {
        done();
      }).catch(console.log);
    });
  });
  test('Should return array', (done) => {
    const options = {
      url: '/notification',
      method: 'GET',
      headers: {
        authtoken,
      },
    };
    server.inject(options).then((response) => {
      expect(typeof JSON.parse(response.payload)).toBe(typeof []);
      done();
    });
  });
  test('Should return all notification of user', (done) => {
    const options = {
      url: '/notification',
      method: 'GET',
      headers: {
        authtoken,
      },
    };
    server.inject(options).then((response) => {
      expect(JSON.parse(response.payload)[0].text).toBe('you have requested 10 btc from parth');
      done();
    });
  });
  test('Should set status of user to true for put request', (done) => {
    const options = {
      url: '/notification',
      method: 'PUT',
      headers: {
        authtoken,
      },
    };
    server.inject(options).then((response) => {
      expect(response.statusCode).toBe(204);
      done();
    });
  });
});
