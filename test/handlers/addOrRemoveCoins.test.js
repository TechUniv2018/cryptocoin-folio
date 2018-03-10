const addOrRemoveCoins = require('../../src/handlers/addOrRemoveCoins');
const Models = require('../../models');
const getCoinsArray = require('../../src/utils/helpers/getCoinsArrayforSeed');

describe('testing whether the addOrRemoveCoin function works or not', () => {
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
  }).then(() =>
    Models.coins.bulkCreate(getCoinsArray()).then(() => done()))));

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

  test('checking whether transaction is being inserted with the right fromId', (done) => {
    addOrRemoveCoins(2, 'BTC', 12345, 23).then((result) => {
      expect(result.fromId).toBe(1);
    }).then(() => {
      done();
    });
  });
  test('checking whether transaction is being inserted with the right toId', (done) => {
    addOrRemoveCoins(2, 'BTC', 12345, 23).then((result) => {
      expect(result.toId).toBe(2);
    }).then(() => {
      done();
    });
  });
  test('checking whether transaction is being inserted with the right price', (done) => {
    addOrRemoveCoins(2, 'BTC', 12345, 23).then((result) => {
      expect(result.price).toBe(12345);
    }).then(() => {
      done();
    });
  });
  test('checking whether transaction is being inserted with the right quantity', (done) => {
    addOrRemoveCoins(2, 'BTC', 12345, 23).then((result) => {
      expect(result.quantity).toBe(23);
    }).then(() => {
      done();
    });
  });
});

