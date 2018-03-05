const getTransactions = require('../../../src/utils/helpers/getTransactions');
const createUser = require('../../../src/utils/helpers/createNewUser');
const createCoin = require('../../../src/utils/helpers/createCoin');
const createTransaction = require('../../../src/utils/helpers/createTransaction');
const Models = require('../../../models');

describe('Test for getTransactions helper function', () => {
  const details = {
    price: 100,
    quantity: 1000,
  };
  beforeAll((done) => {
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
  afterAll((done) => {
    Models.transactions.destroy({ cascade: true, truncate: true })
      .then(() =>
        Models.coins.destroy({ cascade: true, truncate: true }))
      .then(() =>
        Models.users.destroy({ cascade: true, truncate: true }))
      .then(() => done());
  });
  test('Should return user transactions', (done) => {
    getTransactions(details.toId).then((result) => {
      expect(Object.keys(result[0]).sort()).toEqual(['coinId', 'id', 'price', 'quantity', 'fromId', 'toId'].sort());
      done();
    });
  });
});
