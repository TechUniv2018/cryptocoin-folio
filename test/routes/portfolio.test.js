const Server = require('../../index.js');

const options = {
  method: 'GET',
  url: '/portfolio',
};

describe('Test for portfolio API', () => {
  test('Should pass for route', (done) => {
    Server.inject(options, (response) => {
      expect(response.result).toBe('Portfolio Page');
      done();
    });
  });
});
