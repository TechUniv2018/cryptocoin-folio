
module.exports = (sequelize, DataTypes) => {
  const coins = sequelize.define('coins', {
    symbol: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return coins;
};
