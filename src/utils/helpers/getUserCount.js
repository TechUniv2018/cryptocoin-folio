const Models = require('../../../models');

module.exports = userId => Models.users.findAll({
  where: {
    id: userId,
  },
  raw: true,
});
