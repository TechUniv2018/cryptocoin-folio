const Models = require('../../../models');

const editTransaction = (userId, transactionId, price, quantity, coin) =>
  Models.coins.findAll({
    where: {
      symbol: coin,
    },
  }).then(coinObtained => Models.transactions.upsert({
    id: transactionId,
    toId: userId,
    fromId: 1,
    quantity,
    price,
    coinId: coinObtained.id,
  }).then(() => 'transaction edited').catch(() => 'transaction not edited'));


module.exports = editTransaction;
