const Models = require('../../../models');
const getNotification = require('../../../src/utils/helpers/getNotification');

describe('Test for getTransactions helper function', () => {
  beforeAll((done) => {
    Models.notifications.create({
      userId: 2,
      transactionId: 1,
      text: 'Bill Gates approved your request for 100 BTC',
    })
      .then(() => done());
  });
  afterAll((done) => {
    Models.notifications.destroy({ cascade: true, truncate: true })
      .then(() => done());
  });
  test('Should return user transactions', (done) => {
    getNotification(2)
      .then((result) => {
        console.log(result);
        expect(result[0].text).toBe('Bill Gates approved your request for 100 BTC');
        done();
      });
  });
});
