const signup = require('./signup');
const login = require('./login');

module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply('Hello world!');
  },
}].concat(signup, login);
