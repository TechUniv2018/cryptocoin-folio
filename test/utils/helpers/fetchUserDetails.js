const fetchUserDetails = require('../../../src/utils/helpers/fetchUserDetails');
const Server = require('../../../index');

describe('Test for fetchUserDetails helper function', () => {
  beforeAll((done) => {
    const options = {
      method: 'POST',
      url: '/signup',
      payload: {
        fullName: 'Jack Mark',
        email: 'jackmark@alibababa.com',
        password: 'sample',
        confirmPassword: 'sample',
        mobileNumbe: 9876543210,
      }
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(201);
      done();
    });
  })
  test('Should return true for new user', (done) => {
    const options = 'jackmark@alibababa.com';
    fetchUserDetails(options).then((message) => {
      expect(Object.keys(message[0].dataValues).sort()).toEqual(['createdAt', 'email', 'id', 'fullName', 'mobileNumbe','password', 'updatedAt'].sort());
      done();
    });
  });
});
