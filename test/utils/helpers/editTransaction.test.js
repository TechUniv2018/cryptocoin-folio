const editTransaction = require('../../../src/utils/helpers/editTransaction');
const getCoinsArray = require('../../../src/utils/helpers/getCoinsArrayforSeed');
const Models = require('../../../models');
const addOrRemoveCoins = require('../../../src/utils/helpers/addOrRemoveCoins');

describe('checking if the editTransaction function works or not', () => {
  let transactionid;
  let coinId;
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
  }).then(() => Models.coins.bulkCreate(getCoinsArray()).then(() => Models.coins.findAll({
    where: { symbol: 'BTC' },
  }).then((result) => {
    coinId = result.id;
  }))
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
  test('checking if editting is being done or not', (done) => {
    editTransaction(2, transactionid, 2, 2, coinId).then((result) => {
      expect(result).toBe('transaction edited');
      done();
    });
  });
  test('checking if editting gives  error when user id is wrong', (done) => {
    editTransaction(100, 123, 2, 2, coinId).then((result) => {
      expect(result).toBe('transaction not edited');
      done();
    });
  });
});
