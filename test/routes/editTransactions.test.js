const server = require('../../index');
const jwt = require('jsonwebtoken');
const createUser = require('../../src/utils/helpers/createNewUser');
const getCoinArray = require('../../src/utils/helpers/getCoinsArrayforSeed');
const Models = require('../../models');
const addOrRemoveCoins = require('../../src/utils/helpers/addOrRemoveCoins');

describe('Test for editTransaction api', () => {
  let token;
  let transactionid;
  beforeAll((done) => {
    const sampleUser = {
      fullName: 'Bill Gates',
      email: 'billgates@microsoft.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
      id: 10,
    };
    createUser(sampleUser)
      .then((result) => {
        token = jwt.sign({ userId: result.id }, 'cryptic-crypto', { expiresIn: '1h' });
        const admin = {
          fullName: 'admin',
          email: 'admin@admin.com',
          password: 'sample',
          confirmPassword: 'sample',
          mobileNumbe: 9876543210,
          id: 1,
        };
        return createUser(admin).then(() =>
          Models.coins.bulkCreate(getCoinArray()).then(() => addOrRemoveCoins(10, 'BTC', 12345, 23)).then((record) => {
            transactionid = record.id;
          })
            .then(() => done()));
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

  it('checking if the status code being returned is 200 or not', (done) => {
    const options = {
      url: `/editTransaction?delete=${transactionid}`,
      method: 'POST',
      headers: {
        authtoken: token,
      },
    };
    server.inject(options).then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.result).toBe('transaction deleted');
      done();
    });
  });
  it('checking if the deleting is done from the database', (done) => {
    addOrRemoveCoins(10, 'BTC', 12345, 23).then((record) => {
      const options = {
        url: `/editTransaction?delete=${record.id}`,
        method: 'POST',
        headers: {
          authtoken: token,
        },
      };
      server.inject(options).then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.result).toBe('transaction deleted');
        Models.transactions.findAll({
          where: {
            id: record.id,
          },
        }).then((data) => {
          expect(data.length).toBe(0);
          done();
        });
      });
    });
  });
  it('checking if the transaction is being rejected when given arbitrary id or not ', (done) => {
    const options = {
      url: '/editTransaction?delete=1289',
      method: 'POST',
      headers: {
        authtoken: token,
      },
    };
    server.inject(options).then((response) => {
      expect(response.statusCode).toBe(409);
      expect(response.result).toBe('transaction deleting failed');
      done();
    });
  });
  it('checking if the transaction is being edited or not with status code and response', (done) => {
    const options = {
      url: `/editTransaction?edit=${transactionid}`,
      method: 'POST',
      payload: {
        coin: 'LTC',
        quantity: 4,
        price: 1000,
      },
      headers: {
        authtoken: token,
      },
    };
    server.inject(options).then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.result).toBe('transaction edited');
      done();
    });
  });
  it('checking if the transaction is being edited or not by checking database', (done) => {
    const options = {
      url: `/editTransaction?edit=${transactionid}`,
      method: 'POST',
      payload: {
        coin: 'LTC',
        quantity: 4,
        price: 1000,
      },
      headers: {
        authtoken: token,
      },
    };
    server.inject(options).then(() => Models.transactions.findOne({
      where: {
        id: transactionid,
      },
    }).then((result) => {
      expect(result.quantity).toBe(4);
      expect(result.price).toBe(1000);
    }).then(() => done()));
  });
  it('checking if the transaction is being edited or not by checking coinId', (done) => {
    let resultCoin;
    const options = {
      url: `/editTransaction?edit=${transactionid}`,
      method: 'POST',
      payload: {
        coin: 'LTC',
        quantity: 4,
        price: 1000,
      },
      headers: {
        authtoken: token,
      },
    };
    server.inject(options).then(() => Models.coins.findAll({
      where: {
        symbol: 'LTC',
      },
    })).then((result) => {
      resultCoin = result;
      return Models.transactions.findAll({
        where: {
          id: transactionid,
        },
      }).then((resultTransaction) => {
        expect(resultCoin.id).toBe(resultTransaction.coinId);
      }).then(() => done());
    });
  });
});
