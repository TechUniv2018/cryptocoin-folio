const createUser = require('../../../src/utils/helpers/createNewUser');
const Models = require('../../../models/');

describe('Test for signup API with valid data', () => {
  afterAll((done) => {
    Models.users.destroy({
      truncate: true,
      cascade: true,
    }).then(() => {
      done();
    }).catch(console.log);
  });
  test('Should store data in user table', (done) => {
    const options = {
      fullName: 'Bill Gates',
      email: 'billgates@microsoft.com',
      password: 'sample',
      confirmPassword: 'sample',
      mobileNumbe: 9876543210,
    };
    createUser(options)
      .then((message) => {
        expect(message).toBe('OK');
        done();
      });
  });
});
