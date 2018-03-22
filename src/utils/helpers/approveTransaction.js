const Models = require('../../../models');

module.exports = (id, status) => Models.transactions.update(
  {
    status,
  },
  {
    where: {
      id,
    },
  },
);
