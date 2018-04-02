const Models = require('../../../models');

module.exports = userId => Promise.all([
  Models.transactions.findAll({
    where: {
      [Models.Sequelize.Op.or]: [{
        fromId: userId,
      }, {
        toId: userId,
        quantity: { [Models.Sequelize.Op.lt]: 0 },
      }],
      status: 0,
    },
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Models.coins,
        attributes: ['symbol', 'name'],
      },
      {
        model: Models.users,
        as: 'from',
        attributes: ['fullName', 'id'],
      },
      {
        model: Models.users,
        as: 'to',
        attributes: ['fullName', 'id'],
      },
    ],
  }), Models.transactions.findAll({
    where: {
      toId: userId,
      quantity: {
        [Models.Sequelize.Op.gt]: 0,
      },
      status: 0,
    },
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Models.coins,
        attributes: ['symbol', 'name'],
      },
      {
        model: Models.users,
        as: 'from',
        attributes: ['fullName', 'id'],
      },
      {
        model: Models.users,
        as: 'to',
        attributes: ['fullName', 'id'],
      },
    ],
  }), Models.transactions.findAll({
    where: {
      fromId: userId,
      status: {
        [Models.Sequelize.Op.not]: 0,
      },
    },
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Models.coins,
        attributes: ['symbol', 'name'],
      },
      {
        model: Models.users,
        as: 'from',
        attributes: ['fullName', 'id'],
      },
      {
        model: Models.users,
        as: 'to',
        attributes: ['fullName', 'id'],
      },
    ],
  }), Models.transactions.findAll({
    where: {
      toId: userId,
      status: {
        [Models.Sequelize.Op.not]: 0,
      },
    },
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Models.coins,
        attributes: ['symbol', 'name'],
      },
      {
        model: Models.users,
        as: 'from',
        attributes: ['fullName', 'id'],
      },
      {
        model: Models.users,
        as: 'to',
        attributes: ['fullName', 'id'],
      },
    ],
  })]);
