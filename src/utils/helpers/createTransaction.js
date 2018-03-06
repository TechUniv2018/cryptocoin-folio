const Models = require('../../../models');

const createTransactions = details =>
  Models.transactions.create(details)
    .then(result => result.dataValues)
    .catch(err => err);
module.exports = createTransactions;
