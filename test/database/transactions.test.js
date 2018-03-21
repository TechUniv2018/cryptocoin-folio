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

  test('insert transaction into transaction table should fail with Sequelize Foreign Key Constraint Error', (done) => {
    const transactionObject = {
      coinId: 1,
      toId: 1,
      fromId: 0,
      price: 321.3213,
      quantity: 10.12,
    };

    Models.transactions.create(transactionObject).then().catch((e) => {
      expect(e.name).toBe('SequelizeForeignKeyConstraintError');
      done();
    });
  });

  test('insert transaction into transaction table should fail with Sequelize Foreign Key Constraint Error - from user does not exit', (done) => {
    const userObject = {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };

    Models.users.create(userObject).then((userResult) => {
      const transactionObject = {
        coinId: 1,
        toId: userResult.dataValues.id,
        fromId: 0,
        price: 321.3213,
        quantity: 10.12,
      };

      Models.transactions.create(transactionObject).then().catch((e) => {
        expect(e.name).toBe('SequelizeForeignKeyConstraintError');
        done();
      });
    });
  });

  test('insert transaction into transaction table should fail with Sequelize Foreign Key Constraint Error - Coin does not exist', (done) => {
    const userObject = {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };

    Models.users.create(userObject).then((userResult) => {
      const adminObject = {
        fullName: 'admin',
        email: 'admin@admin',
        password: 'sample',
        confirmPassword: 'sample',
        mobileNumbe: 9876543210,
        id: 0,
      };
      Models.users.create(adminObject).then((adminResult) => {
        const transactionObject = {
          coinId: 1,
          toId: userResult.dataValues.id,
          fromId: adminResult.dataValues.id,
          price: 321.3213,
          quantity: 10.12,
        };
        Models.transactions.create(transactionObject).then().catch((e) => {
          expect(e.name).toBe('SequelizeForeignKeyConstraintError');
          done();
        });
      });
    });
  });

  test('insert transaction into transaction table should fail with Sequelize Foreign Key Constraint Error - To  and from User does not exist', (done) => {
    const coinObj = {
      symbol: 'BTC',
      name: 'Bitcoin',
    };

    Models.coins.create(coinObj).then((coinResult) => {
      const transactionObject = {
        coinId: coinResult.dataValues.id,
        toId: 1,
        fromId: 0,
        price: 321.3213,
        quantity: 10.12,
      };

      Models.transactions.create(transactionObject).then().catch((e) => {
        expect(e.name).toBe('SequelizeForeignKeyConstraintError');
        done();
      });
    });
  });

  test('insert transaction into transaction table should be successful', (done) => {
    const coinObj = {
      symbol: 'BTC',
      name: 'Bitcoin',
    };

    const adminObject = {
      fullName: 'admin',
      email: 'admin@admin',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
      id: 0,
    };

    const userObject = {
      fullName: 'Jack Mark',
      email: 'jackmark@alibababa.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };

    Models.coins.create(coinObj).then((coinResult) => {
      Models.users.create(adminObject).then((adminResult) => {
        Models.users.create(userObject).then((userResult) => {
          const transactionObject = {
            coinId: coinResult.dataValues.id,
            toId: userResult.dataValues.id,
            fromId: adminResult.dataValues.id,
            price: 321.3213,
            quantity: 10.12,
          };

          Models.transactions.create(transactionObject).then((resultTransaction) => {
            const transactionResultObject = {
              coinId: coinResult.dataValues.id,
              toId: userResult.dataValues.id,
              fromId: adminResult.dataValues.id,
              price: resultTransaction.dataValues.price,
              quantity: resultTransaction.dataValues.quantity,
            };

            expect(transactionResultObject).toEqual(transactionObject);
            done();
          });
        });
      });
    });
  });

  beforeEach((done) => {
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
