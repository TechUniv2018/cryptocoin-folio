const server = require('../../index');
const jwt = require('jsonwebtoken');
const createUser = require('../../src/utils/helpers/createNewUser');
const getCoinArray = require('../../src/utils/helpers/getCoinsArrayforSeed');
const Models = require('../../models');

describe('Test for portfolio API', () => {
  let token;
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
        token = jwt.sign({ userId: result.id }, 'cryptic-crypto', { expiresIn: '1h' });
        const admin = {
          fullName: 'admin',
          email: 'admin@admin.com',
          password: 'sample',
          confirmPassword: 'sample',
          mobileNumbe: 9876543210,
          id: 1,
        };
        return createUser(admin).then(() =>
          Models.coins.bulkCreate(getCoinArray()).then(() => done()))
          .then(() => done());
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
  beforeEach((done) => {
    Models.transactions.destroy({ cascade: true, truncate: true }).then(() => done());
  });

  it('checking if the status code being returned is 201 or not', (done) => {
    const options = {
      url: '/editPortfolioCoin',
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
      expect(response.statusCode).toBe(201);
      expect(Object.keys(response.result).sort()).toEqual(['coinId', 'coinName', 'createdAt', 'fromId', 'id', 'price', 'quantity', 'toId', 'updatedAt'].sort());
      done();
    });
  });
  it('checking if the insertion has happened or not ', (done) => {
    const options = {
      url: '/editPortfolioCoin',
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
      expect(response.statusCode).toBe(201);
      Models.transactions.findAll({ where: { fromId: 1, toId: 10 } }).then((result) => {
        expect(result.length).toBe(1);
      }).then(() => done());
    });
  });
});
