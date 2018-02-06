const Server = require('../index');
const LiveGraphHandler = require('../src/handlers/LiveGraph');

describe('testing server', () => {
  test('Response code should be 200', (done) => {
    const options = {
      method: 'GET',
      url: '/',
    };

    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Response message should be Hello world!', (done) => {
    const options = {
      method: 'GET',
      url: '/',
    };

    Server.inject(options, (response) => {
      expect(response.result).toBe('Hello world!');
      done();
    });
  });
});

describe('Testing the LiveGraph API', () => {
  test('The route should return a 200 success code', (done) => {
    Server.inject('/LiveGraph', (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('Testing the Live Graph Handler function', () => {
  test('The function must return a Promise', () => {
    expect(LiveGraphHandler('BTC')).toBeInstanceOf(Promise);
  });
  test('The function should return a resolved promise', () => {
    expect(LiveGraphHandler()).resolves.not.toBeUndefined();
  });
});
