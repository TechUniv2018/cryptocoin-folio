const signup = require('./signup');
const login = require('./login');
const liveGraph = require('./liveGraph');
const prices = require('./prices');
const portfolio = require('./portfolio');
const orders = require('./orders');
const historicalData = require('./historicalData');

module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply('Hello world!');
  },
}].concat(signup, prices, liveGraph, login, orders, portfolio);
