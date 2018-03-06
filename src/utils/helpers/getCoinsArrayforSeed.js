const coinObj = require('./../constants/coin-dictionary');

module.exports = () => {
  const coinArray = [];
  Object.keys(coinObj).forEach((key) => {
    const coin = {};
    coin.symbol = key;
    coin.name = coinObj[key];
    coin.createdAt = new Date();
    coin.updatedAt = new Date();
    coinArray.push(coin);
  });
  return coinArray;
};
