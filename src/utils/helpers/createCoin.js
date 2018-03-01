const Models = require('../../../models');

const createCoin = (symbol, name) => new Promise((resolve, reject) =>
  Models.coins.create({
    symbol,
    name,
  })
    .then(resolve('OK'))
    .catch(err => reject(err)));
module.exports = createCoin;
