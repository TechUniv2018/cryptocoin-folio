const createUser = require('../../../src/utils/helpers/createNewUser');
const createCoin = require('../../../src/utils/helpers/createCoin');
const createTransaction = require('../../../src/utils/helpers/createTransaction');
const Models = require('../../../models/');

describe('Test for create transaction function', () => {
  const transaction = {};
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
        transaction.toId = details.id;
        const admin = {
          fullName: 'admin',
          email: 'admin@admin.com',
          password: 'sample',
          confirmPassword: 'sample',
          mobileNumbe: 9876543210,
        };
        createUser(admin)
          .then((adminDetails) => {
            transaction.fromId = adminDetails.id;
            const coin = {
              symbol: '$',
              name: 'bitcoin',
            };
            createCoin(coin)
              .then((result) => {
                transaction.coinId = result.id;
              })
              .then(() => done());
          });
      });
  });
  afterAll((done) => {
    Models.transactions.destroy({
      truncate: true,
      cascade: true,
    }).then(() => {
      Models.coins.destroy({
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
  });
  test('Should store data in transaction table', (done) => {
    const options = {
      userId: transaction.userId,
      coinId: transaction.coinId,
      price: 2000,
      quantity: 10000,
    };
    createTransaction(options)
      .then((message) => {
        expect(Object.keys(message).sort()).toEqual(['id', 'coinId', 'status', 'toId', 'fromId', 'price', 'quantity', 'createdAt', 'updatedAt'].sort());
        done();
      });
  });
});
