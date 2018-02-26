const server = require('../../index');

describe('Testing the signin route', () => {
  test('The route should return a 200 OK on post request', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
    };
    server.inject(options, (result) => {
      expect(result.statusCode).toBe(200);
      done();
    });
  });
});
