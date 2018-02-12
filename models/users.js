
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    fullName: DataTypes.STRING,
    mobileNumbe: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return users;
};
