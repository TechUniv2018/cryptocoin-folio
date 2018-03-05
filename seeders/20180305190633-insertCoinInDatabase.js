const coinObj = require('./../src/utils/constants/coin-dictionary');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const coinArray = [];
    Object.keys(coinObj).forEach((key) => {
      const coin = {};
      coin.symbol = key;
      coin.name = coinObj[key];
      coin.createdAt = new Date();
      coin.updatedAt = new Date();
      coinArray.push(coin);
    });
    console.log(coinArray);
    return queryInterface.bulkInsert('coins', coinArray).then(console.log, console.log).catch(e => console.log(e));
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('coins', null, {}),
};
