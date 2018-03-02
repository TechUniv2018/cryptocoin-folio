const Models = require('../../../models');

const createCoin = (symbol, name) =>
  Models.coins.create({
    symbol,
    name,
  })
    .then(result => result.dataValues)
    .catch(err => err);
module.exports = createCoin;
