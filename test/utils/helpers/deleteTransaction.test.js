const deleteTransaction = require('../../../src/utils/helpers/deleteTransaction');
const getCoinsArray = require('../../../src/utils/helpers/getCoinsArrayforSeed');
const Models = require('../../../models');
const addOrRemoveCoins = require('../../../src/utils/helpers/addOrRemoveCoins');


describe('checking if the delete is done or not', () => {
  let transactionid;
  beforeAll(done => Models.users.upsert({
    id: 1,
    fullName: 'crypto',
    mobileNumbe: 9876543210,
    email: 'crypto@gmail.com',
    password: 'helloCrypto',
  }).then(() => Models.users.upsert({
    id: 2,
    fullName: 'parth',
    mobileNumbe: 9876547650,
    email: 'parth@gmail.com',
    password: 'helloC[arth]o',
  }).then(() => Models.coins.bulkCreate(getCoinsArray())
    .then(() => addOrRemoveCoins(2, 'BTC', 12345, 23)).then((record) => {
      transactionid = record.id;
    })
    .then(() => done()))));

  afterAll((done) => {
    Models.users.destroy({ truncate: true, cascade: true }).then(() =>
      Models.coins.destroy({ truncate: true, cascade: true }).then(() =>
        Models.transactions.destroy({ truncate: true, cascade: true }).then(() => done())));
  });
  afterEach((done) => {
    Models.transactions.destroy({ truncate: true, cascade: true }).then(() => {
      done();
    });
  });
  test('deleting the transaction present', (done) => {
    deleteTransaction(2, transactionid).then((result) => {
      expect(result).toBe('transaction deleted');
      done();
    });
  });
  test('deleting the transaction present', (done) => {
    deleteTransaction(2, 300).then((result) => {
      expect(result).toBe('transaction deleting failed');
      done();
    });
  });
});

