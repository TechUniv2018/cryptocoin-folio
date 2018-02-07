'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    fullName: DataTypes.STRING,
    mobileNumbe: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};