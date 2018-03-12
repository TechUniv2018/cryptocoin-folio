const Models = require('../../../models');

const transferToUser = (userId, emailTo, coinSymbol, quantity) => Models.users.findAll({
  where: {
    email: emailTo,
  },
}).then((user) => {
  if (user.length === 0) {
    return ('user doesnt exist');
  }
  return Models.coins.findAll({
    where: {
      symbol: coinSymbol,
    },
  }).then((coin) => {
    if (coin.length === 0) {
      return ('coin does not exists');
    }
    return Models.transactions.create({
      coinId: coin[0].dataValues.id,
      fromId: userId,
      toId: user[0].dataValues.id,
      price: 0,
      quantity,
    }).then(() => 'transfer successful');
  });
});

module.exports = transferToUser;
