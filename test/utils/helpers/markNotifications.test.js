const Models = require('../../../models');
const markNotification = require('../../../src/utils/helpers/markNotifications');
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
    markNotification(2)
      .then(() => {
        getNotification(2)
          .then((result) => {
            expect(result[0].status).toBe(true);
            done();
          });
      });
  });
});
