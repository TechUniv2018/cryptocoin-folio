const server = require('../../index');
const jwt = require('jsonwebtoken');
const createUser = require('../../src/utils/helpers/createNewUser');
const getCoinArray = require('../../src/utils/helpers/getCoinsArrayforSeed');
const Models = require('../../models');
const addOrRemoveCoins = require('../../src/utils/helpers/addOrRemoveCoins');

describe('Test for portfolio API', () => {
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
          id: 1,
        };
        return createUser(admin).then(() =>
          Models.coins.bulkCreate(getCoinArray()).then(() => addOrRemoveCoins(10, 'BTC', 12345, 23)).then((record) => {
            transactionid = record.id;
          })
            .then(() => done()));
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

  it('checking if the status code being returned is 200 or not', (done) => {
    const options = {
      url: `/editTransaction?delete=${transactionid}`,
      method: 'POST',
      payload: {
        coin: 'LTC',
        quantity: 4,
        price: 1000,
      },
      headers: {
        authtoken: token,
      },
    };
    server.inject(options).then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.result).toBe('transaction deleted');
      console.log(response);
      done();
    });
  });
  it('checking if the insertion has happened or not ', (done) => {
    const options = {
      url: '/editTransaction?delete=1289',
      method: 'POST',
      payload: {
        coin: 'LTC',
        quantity: 4,
        price: 1000,
      },
      headers: {
        authtoken: token,
      },
    };
    server.inject(options).then((response) => {
      expect(response.statusCode).toBe(409);
      expect(response.result).toBe('transaction deleting failed');
      done();
    });
  });
});
