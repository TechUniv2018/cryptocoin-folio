const Models = require('../../../models');

const deleteTransaction = (userId, transactionId) => Models.transactions.destroy({
  where: {
    toId: userId,
    id: transactionId,
  },
}).then((result) => {
  console.log(result);
  if (result === 1) {
    return 'transaction deleted';
  }
  return 'transaction deleting failed';
}).catch(() => 'transaction deleting failed');

module.exports = deleteTransaction;
