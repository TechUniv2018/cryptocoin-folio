const Models = require('../../models');

const cleanUpAllTables = () => [Models.prices.destroy({ cascade: true, truncate: true }),
  Models.transactions.destroy({ cascade: true, truncate: true }),
  Models.coins.destroy({ cascade: true, truncate: true }),
  Models.users.destroy({ cascade: true, truncate: true })];

describe('test transaction table', () => {
  test('test transactions table is created', (done) => {
    Models.transactions.findAll().then((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  beforeAll((done) => {
    Promise.all(cleanUpAllTables()).then(() => {
      done();
    });
  });

  afterAll((done) => {
    Promise.all(cleanUpAllTables()).then(() => {
      done();
    });
  });
});
