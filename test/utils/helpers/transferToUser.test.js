const transferToUser = require('../../../src/utils/helpers/transferToUser');
const getCoinsArray = require('../../../src/utils/helpers/getCoinsArrayforSeed');
const Models = require('../../../models');


describe('checking if the transfertToUser', () => {
  let coinId;
  beforeAll(done => Models.users.upsert({
    id: 1,
    fullName: 'crypto',
    mobileNumbe: 9876543210,
    email: 'crypto@gmail.com',
    password: 'helloCrypto',
  }).then(() => Models.users.upsert({
    id: 3,
    fullName: 'parthNew',
    mobileNumbe: 9871547650,
    email: 'new@gmail.com',
    password: 'hesda]o',
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
  })).then(() => done())))));
  it('checking if reply is appropriate or not', () => transferToUser(2, 'new@gmail.com', 'BTC', 10).then(reply => expect(reply).toBe('transfer successful')));
  it('checking if the transaction has been inserted to the database or not', () => {
    transferToUser(2, 'new@gmail.com', 'LTC', 9).then(() => {
      Models.transactions.findAll({
        where: {
          fromId: 2,
          toId: 3,
          quantity: 9,
          coinId,
        },
      }).then(reply => expect(reply.length).toBeGreaterThan(0));
    });
  });
});

