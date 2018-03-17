const Models = require('../../../models');

module.exports = userId => Promise.all([Models.transactions.findAll({
  where: { fromId: userId },
  include: [
    {
      model: Models.coins,
      attributes: ['symbol', 'name'],
    },
    {
      model: Models.users,
      as: 'from',
      attributes: ['fullName', 'id'],
    },
    {
      model: Models.users,
      as: 'to',
      attributes: ['fullName', 'id'],
    },
  ],
}), Models.transactions.findAll({
  where: { toId: userId },
  include: [
    {
      model: Models.coins,
      attributes: ['symbol', 'name'],
    },
    {
      model: Models.users,
      as: 'from',
      attributes: ['fullName', 'id'],
    },
    {
      model: Models.users,
      as: 'to',
      attributes: ['fullName', 'id'],
    },
  ],
})]);
