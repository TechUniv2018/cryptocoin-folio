const signup = require('./signup');
const login = require('./login');
const liveGraph = require('./liveGraph');
const prices = require('./prices');
const portfolio = require('./portfolio');
const orders = require('./orders');
const editPortfolioCoin = require('./editPortfolioCoin');
const editTransactions = require('./editTransactions');
const twitter = require('./twitter');
const transfer = require('./transfer');
const getUsername = require('./getUsername');

module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply('Hello world!');
  },
}].concat(
  signup, prices,
  liveGraph, login, orders, portfolio, editPortfolioCoin,
  editTransactions, twitter, transfer, getUsername,
);
