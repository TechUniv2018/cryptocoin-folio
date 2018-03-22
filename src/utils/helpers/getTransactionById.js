const Models = require('../../../models');

module.exports = (transactionId, fromId) => Models.transactions.findAll({
  where: {
    id: transactionId,
    fromId,
  },
  raw: true,
});
