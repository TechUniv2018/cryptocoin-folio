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
        details.userId = result.id;
        return {
          name: 'bitcoin',
          symbol: '$',
        };
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
  test('Should return user transactions', (done) => {
    getTransactions(details.userId).then((result) => {
      expect(Object.keys(result[0]).sort()).toEqual(['coinId', 'createdAt', 'id', 'price', 'quantity', 'updatedAt', 'userId'].sort());
      done();
    });
  });
});
