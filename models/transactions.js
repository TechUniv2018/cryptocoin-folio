'use strict';
module.exports = (sequelize, DataTypes) => {
  var transactions = sequelize.define('transactions', {
    coinId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    quantity: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return transactions;
};