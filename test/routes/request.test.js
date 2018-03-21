const server = require('../../');

describe('Testing the request POST route.', () => {
  test('The route should respond with a 201 code.', (done) => {
    const options = {
      url: '/request',
      method: 'POST',
    };
    server.inject(options, (result) => {
      expect(result.statusCode).toBe(201);
      done();
    });
  });
});

