const Models = require('../../../models');

module.exports = coinId => Models.coins.count({
  where: {
    id: coinId,
  },
});
