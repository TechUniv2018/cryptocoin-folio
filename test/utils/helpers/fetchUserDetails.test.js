const fetchUsers = require('../../../src/utils/helpers/fetchUserDetails');
const server = require('../../../index');

describe('Testing the fetchUsers function', () => {
  beforeEach((done) => {
    const options = {
      method: 'POST',
      url: '/signup',
      payload: {
        fullName: 'Jack Mark',
        email: 'shubham.zanwar@gmail.com',
        password: 'sample',
        confirmPassword: 'sample',
        mobileNumbe: 9876543210,
      },
    };
    server.inject(options, () => {
      done();
    });
  });
  test('The function should return a promise that resolves with the userdetails object if a valid email is sent', (done) => {
    fetchUsers('shubham.zanwar@gmail.com').then((user) => {
      expect(typeof user.dataValues).toBe(typeof {});
      done();
    });
  });
});

