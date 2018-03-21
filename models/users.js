
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    fullName: DataTypes.STRING,
    mobileNumbe: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return users;
};
