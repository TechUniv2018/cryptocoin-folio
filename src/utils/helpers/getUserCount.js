const Models = require('../../../models');

module.exports = userId => Models.users.count({
  where: {
    id: userId,
  },
});
