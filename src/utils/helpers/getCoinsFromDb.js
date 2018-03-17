const Models = require('../../../models');

module.exports = () => Models.coins.findAll({ raw: true });

// module.exports = () => Models.coins.findAll({ raw: true, limit: 5, offset: 5 });
