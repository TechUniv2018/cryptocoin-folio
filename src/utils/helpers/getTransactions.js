const Models = require('../../../models');

const transactions = userId =>
  Models.transactions.findAll({
    where: {
      [Models.Sequelize.Op.or]: [{ toId: userId }, { fromId: userId }],
    },
  })
    .then(result => result.map(eachtransaction => eachtransaction.dataValues))
    .catch(err => err);
module.exports = transactions;

