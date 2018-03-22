const server = require('../../');
const Models = require('../../models');
const createToken = require('../../src/utils/helpers/createToken');
const encryptPassword = require('../../src/utils/helpers/encryptPassword');

describe('Testing the request POST route.', () => {
  test('The route should respond with a 201 code.', (done) => {
    const options = {
      url: '/request',
      method: 'POST',
      payload: {
        fromId: 3,
        coinId: 1,
        quantity: 2,
      },
      headers: {
        authToken: createToken({ id: 2 }),
      },
    };
    server.inject(options, (result) => {
      expect(result.statusCode).toBe(201);
      done();
    });
  });
});

