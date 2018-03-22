const Models = require('../../../models');

module.exports = coinId => Models.coins.findAll({
  where: {
    symbol: coinId,
  },
  raw: true,
});
