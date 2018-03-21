
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('users', ['email'], {
      type: 'unique',
      name: 'usersEmailUnique',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('users', 'usersEmailUnique');
  },
};
