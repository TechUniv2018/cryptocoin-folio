module.exports = (sequelize, DataTypes) => {
  const otpMessages = sequelize.define('otpMessages', {
    userId: { type: DataTypes.INTEGER, unique: true },
    otp: DataTypes.INTEGER,
  });
  otpMessages.associate = (models) => {
    otpMessages.belongsTo(models.users, { foreignKey: 'userId', as: 'to' });
  };
  return otpMessages;
};
