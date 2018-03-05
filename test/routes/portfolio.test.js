const Server = require('../../index.js');
const jwt = require('jsonwebtoken');
const createUser = require('../../src/utils/helpers/createNewUser');
const createCoin = require('../../src/utils/helpers/createCoin');
const createTransaction = require('../../src/utils/helpers/createTransaction');


describe('Test for portfolio API', () => {
  let token;
  beforeAll((done) => {
    const details = {
      price: 100,
      quantity: 1000,
    };
    const options = {
      fullName: 'Bill Gates',
      email: 'billgates@microsoft.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    createUser(options)
      .then((result) => {
        details.toId = result.id;
        token = jwt.sign({ userId: result.id }, 'thisissamplekeyforjwt', { expiresIn: '1h' });
        const admin = {
          fullName: 'admin',
          email: 'admin@admin.com',
          password: 'sample',
          confirmPassword: 'sample',
          mobileNumbe: 9876543210,
          id: 0,
        };
        createUser(admin)
          .then((result1) => {
            details.fromId = result1.id;
            return {
              name: 'bitcoin',
              symbol: '$',
            };
          });
      })
      .then(result => createCoin(result)
        .then((message) => {
          details.coinId = message.id;
        }))
      .then(() => {
        createTransaction(details)
          .then(() => done());
      });
  });
  test('Should return object', (done) => {
    const options = {
      method: 'GET',
      url: '/portfolio',
      headers: {
        authtoken: token,
      },
    };
    // console.log(options);
    Server.inject(options, (response) => {
      expect(typeof JSON.parse(response.payload)).toBe('object');
      done();
    });
  });
  test('Should return object with fields', (done) => {
    const options = {
      method: 'GET',
      url: '/portfolio',
      headers: {
        authtoken: token,
      },
    };
    // console.log(options);
    Server.inject(options, (response) => {
      expect(response.payload).toEqual('[{"id":1,"fromId":2,"toId":1,"coinId":1,"price":100,"quantity":1000}]');
      done();
    });
  });
});

