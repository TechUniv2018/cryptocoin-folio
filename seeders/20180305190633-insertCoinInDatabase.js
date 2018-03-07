const coinsArray = require('./../src/utils/helpers/getCoinsArrayforSeed');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('coins', coinsArray()).then(console.log, console.log).catch(e => console.log(e)),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('coins', null, {}),
};
