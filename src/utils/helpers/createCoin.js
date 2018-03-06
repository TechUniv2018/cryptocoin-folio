const Models = require('../../../models');

const createCoin = details =>
  Models.coins.create(details)
    .then(result => result.dataValues)
    .catch(err => err);
module.exports = createCoin;
