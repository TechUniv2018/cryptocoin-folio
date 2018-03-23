const server = require('../../');
const Models = require('../../models');
const createToken = require('../../src/utils/helpers/createToken');
const encryptPassword = require('../../src/utils/helpers/encryptPassword');

describe('Testing the request POST route.', () => {
  afterEach(done =>
    Models.users.destroy({
      truncate: true,
      cascade: true,
    }).then(() => Models.coins.destroy({
      truncate: true,
      cascade: true,
    })).then(done));

  test('The route should respond with a 201 code.', (done) => {
    const options = {
      url: '/request',
      method: 'POST',
      payload: {
        fromId: 3,
        coinId: 'BTC',
        quantity: 2,
      },
      headers: {
        authToken: createToken({ id: 2 }),
      },
    };
    const userPromise = Models.users.bulkCreate([{
      id: 2,
      fullName: 'Paul McCartney',
      email: 'paul@gmail.com',
      password: encryptPassword('paul123'),
      mobileNumbe: '9944198887',
    }, {
      id: 3,
      fullName: 'John Lennon',
      email: 'John@gmail.com',
      password: encryptPassword('paul123'),
      mobileNumbe: '9431908524',
    }]);

    const coinPromise = Models.coins.create({
      symbol: 'BTC',
      id: 1,
      name: 'Bitcoin',
    });

    Promise.all([userPromise, coinPromise]).then(() => {
      server.inject(options, (result) => {
        expect(result.statusCode).toBe(201);
        done();
      });
    });
  });

  // test('The route ');
});

