const Models = require('../../../models');

const transactions = userId =>
  Models.transactions.findAll({
    where: {
      [Models.Sequelize.Op.or]: [{ toId: userId }, { fromId: userId }],
    },
  })
    .then(result => result.map(eachtransaction => ({
      id: eachtransaction.dataValues.id,
      fromId: eachtransaction.dataValues.fromId,
      toId: eachtransaction.dataValues.toId,
      coinId: eachtransaction.dataValues.coinId,
      price: eachtransaction.dataValues.price,
      quantity: eachtransaction.dataValues.quantity,
    })))
    .catch(err => err);
module.exports = transactions;

