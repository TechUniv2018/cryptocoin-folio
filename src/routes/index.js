const signup = require('./signup');
const login = require('./login');
const liveGraph = require('./liveGraph');
const prices = require('./prices');
const orders = require('./orders');
const historicalData = require('./historicalData');

module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply('Hello world!');
  },
}].concat(signup, prices, liveGraph, login, orders, historicalData);
