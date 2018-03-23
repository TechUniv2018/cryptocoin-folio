const Models = require('../../../models');

module.exports = id => Models.users.findOne({
  where: {
    id,
  },
  raw: true,
});

