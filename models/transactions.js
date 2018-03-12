
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    coinId: DataTypes.INTEGER,
    fromId: DataTypes.INTEGER,
    toId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    quantity: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        transactions.belongsTo(models.coins);
        transactions.belongsTo(models.users);
      },
    },
  });
  return transactions;
};
