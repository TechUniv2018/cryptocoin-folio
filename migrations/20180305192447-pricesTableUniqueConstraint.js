

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('prices', ['timeStamp', 'coinId'], {
      type: 'unique',
      name: 'pricesTimeStampCoinIdUnique',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('prices', 'pricesTimeStampCoinIdUnique');
  },
};
