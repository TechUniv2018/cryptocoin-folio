const signup = require('./signup');
const login = require('./login');
const liveGraph = require('./liveGraph');
const prices = require('./prices');

module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply('Hello world!');
  },
}].concat(signup, prices, liveGraph, login);

