

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.renameColumn('transactions', 'userId', 'toId')
    .then(() => queryInterface.addColumn('transactions', 'fromId', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
    })),

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('transactions', 'fromId');
    queryInterface.renameColumn('transactions', 'toId', 'userId');
  },
};
