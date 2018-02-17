
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    coinId: {
      type: Sequelize.INTEGER,
      references: { model: 'coins', key: 'id' },
    },
    userId: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
    },
    price: {
      type: Sequelize.FLOAT,
    },
    quantity: {
      type: Sequelize.FLOAT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('transactions'),
};
