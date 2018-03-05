
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('coins', ['symbol'], {
      type: 'unique',
      name: 'coinsSymbolUnique',
    });
    queryInterface.addConstraint('coins', ['name'], {
      type: 'unique',
      name: 'coinsNameUnique',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('users', 'usersEmailUnique');
  },
};
