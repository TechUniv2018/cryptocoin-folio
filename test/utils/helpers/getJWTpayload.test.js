const jwt = require('jsonwebtoken');
const getJWTpayload = require('../../../src/utils/helpers/getJWTpayload');
const { jwtKey } = require('../../../src/utils/constants');

describe('Test for getJWTpayload helper function', () => {
  const samplejwt = {
    headers: {
      authtoken: 0,
    },
  };
  beforeAll((done) => {
    samplejwt.headers.authtoken = jwt.sign({
      data: 'foobar',
    }, jwtKey, { expiresIn: '1m' });
    done();
  });
  test('Should return payload as object', (done) => {
    expect(typeof getJWTpayload(samplejwt)).toBe('object');
    done();
  });
  test('Should return payload', (done) => {
    expect(getJWTpayload(samplejwt).data).toBe('foobar');
    done();
  });
});

describe('Test fail getJWTpayload helper function', () => {
  const samplejwt = {
    headers: {
      authtoken: 0,
    },
  };
  beforeAll((done) => {
    samplejwt.headers.authtoken = jwt.sign({
      data: 'foobar',
    }, jwtKey, { expiresIn: '1ms' });
    done();
  });
  test('Should throw error for expired token', (done) => {
    expect(getJWTpayload(samplejwt).message).toBe('token expired');
    done();
  });
});
