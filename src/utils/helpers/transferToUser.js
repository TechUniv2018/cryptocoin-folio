const Models = require('../../../models');

const transferToUser = (fromId, toId, coinId, quantity) => Models.transactions.create({
  fromId,
  toId,
  coinId,
  quantity,
  price: 0,
});

module.exports = transferToUser;
