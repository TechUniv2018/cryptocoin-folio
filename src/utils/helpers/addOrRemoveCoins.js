const Models = require('../../../models');

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
  })
    .then((result) => {
      const combineObject = result.dataValues;
      combineObject.coinName = coinRecord.name;
      return combineObject;
    });
});

module.exports = addOrRemoveCoin;
