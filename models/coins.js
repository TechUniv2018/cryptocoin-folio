'use strict';
module.exports = (sequelize, DataTypes) => {
  var coins = sequelize.define('coins', {
    symbol: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return coins;
};