
module.exports = (sequelize, DataTypes) => {
  const prices = sequelize.define('prices', {
    timeStamp: DataTypes.STRING,
    coinId: DataTypes.INTEGER,
    open: DataTypes.FLOAT,
    close: DataTypes.FLOAT,
    high: DataTypes.FLOAT,
    low: DataTypes.FLOAT,
    volume: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        prices.belongsTo(models.coins);
      },
    },
    indexes: [{ unique: true, fields: ['timeStamp', 'coinId'] }],
  });
  return prices;
};
