const Models = require('../../models');

const addOrRemoveCoin = (userId, coin, price, quantity) => Models.coins.findOne({
  where: {
    symbol: coin,
  },
}).then((coinRecord) => {
  const { id } = coinRecord.dataValues;
  return Models.transactions.create({
    coinId: id,
    fromId: 1,
    toId: userId,
    price,
    quantity,
  });
});

module.exports = addOrRemoveCoin;
