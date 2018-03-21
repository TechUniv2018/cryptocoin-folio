
module.exports = (sequelize, DataTypes) => {
  const coins = sequelize.define('coins', {
    symbol: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING, unique: true },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        // coins.belongsTo(models.prices);
        // coins.belongsTo(models.transactions);
      },
    },
  });
  return coins;
};
