module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    userId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return notifications;
};
