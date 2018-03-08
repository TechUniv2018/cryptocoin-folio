const Models = require('../../../models');

module.exports = () => Models.coins.findAll({ raw: true, limit: 10 });
