const Models = require('../../../models');

const transactions = userId =>
  Models.transactions.findAll({
    where: {
      [Models.Sequelize.Op.or]: [{ toId: userId }, { fromId: userId }],
    },
  })
    .then(result => result.map(eachresult => eachresult.dataValues))
    .then((allTransactions) => {
      const array = [];
      allTransactions.map((eachTransaction) => {
        const singletransaction = Models.coins.findOne({
          where: {
            id: eachTransaction.coinId,
          },
        })
          .then(coin => ({
            coinName: coin.dataValues.name,
            coinSymbol: coin.dataValues.symbol,
            id: eachTransaction.id,
            fromId: eachTransaction.fromId,
            toId: eachTransaction.toId,
            price: eachTransaction.price,
            quantity: eachTransaction.quantity,
            currentPrice: eachTransaction.price,
          }));
        return array.push(singletransaction);
      });
      return Promise.all(array)
        .then(result => result);
    })
    .catch(err => err);
module.exports = transactions;

