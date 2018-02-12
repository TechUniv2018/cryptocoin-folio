
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    coinId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    quantity: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        transactions.belongsTo(models.users);
        transactions.belongsTo(models.coins);
      },
    },
  });
  return transactions;
};
