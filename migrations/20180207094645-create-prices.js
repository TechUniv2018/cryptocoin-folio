
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('prices', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    timeStamp: {
      type: Sequelize.STRING,
    },
    coinId: {
      type: Sequelize.INTEGER,
      references: { model: 'coins', key: 'id' },
    },
    open: {
      type: Sequelize.FLOAT,
    },
    close: {
      type: Sequelize.FLOAT,
    },
    high: {
      type: Sequelize.FLOAT,
    },
    low: {
      type: Sequelize.FLOAT,
    },
    volume: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('prices'),
};
