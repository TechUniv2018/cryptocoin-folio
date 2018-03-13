const server = require('../../index');
const jwt = require('jsonwebtoken');
const createUser = require('../../src/utils/helpers/createNewUser');
const getCoinArray = require('../../src/utils/helpers/getCoinsArrayforSeed');
const addOrRemoveCoins = require('../../src/utils/helpers/addOrRemoveCoins');
const Models = require('../../models');


describe('checking if the trnsfer route is working or not', () => {
  let token;
  let transactionid;
  beforeAll((done) => {
    const sampleUser = {
      fullName: 'Bill Gates',
      email: 'billgates@microsoft.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
      id: 10,
    };
    createUser(sampleUser)
      .then((result) => {
        token = jwt.sign({ userId: result.id }, 'thisissamplekeyforjwt', { expiresIn: '1h' });
        const admin = {
          fullName: 'admin',
          email: 'admin@admin.com',
          password: 'sample',
          confirmPassword: 'sample',
          mobileNumbe: 9876543210,
          id: 50,
        };
        return createUser(admin).then(() =>
          Models.coins.bulkCreate(getCoinArray())
            .then(() => done()));
      });
  });
  it('checking if the status code being sent is 201 or not', () => {
    const options = {
      url: '/transfer',
      method: 'post',
      payload: {
        emailTo: 'admin@admin.com',
        quantity: 10,
        symbol: 'BTC',
      },
      headers: {
        authtoken: token,
      },
    };
    return server.inject(options).then((response) => {
      expect(response.statusCode).toBe(201);
    });
  });
  afterAll((done) => {
    Models.transactions.destroy({ cascade: true, truncate: true })
      .then(() =>
        Models.coins.destroy({ cascade: true, truncate: true }))
      .then(() =>
        Models.users.destroy({ cascade: true, truncate: true }))
      .then(() => done());
  });
  it('checking if the status code being sent is 401 when user does not exist', () => {
    const options = {
      url: '/transfer',
      method: 'post',
      payload: {
        emailTo: 'admsdfsfin@admin.com',
        quantity: 10,
        symbol: 'BTC',
      },
      headers: {
        authtoken: token,
      },
    };
    return server.inject(options).then((response) => {
      expect(response.statusCode).toBe(401);
    });
  });
  it('checking if the status code being sent is 401 when coin does not exist', () => {
    const options = {
      url: '/transfer',
      method: 'post',
      payload: {
        emailTo: 'admin@admin.com',
        quantity: 10,
        symbol: 'LOL',
      },
      headers: {
        authtoken: token,
      },
    };
    return server.inject(options).then((response) => {
      expect(response.statusCode).toBe(401);
    });
  });
});

