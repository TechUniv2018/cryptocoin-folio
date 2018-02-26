const signup = require('./signup');
const liveGraph = require('./liveGraph');
const prices = require('./prices');

module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply('Hello world!');
  },
}].concat(signup, prices, liveGraph);
