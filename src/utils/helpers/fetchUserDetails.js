const Models = require('../../../models');

module.exports = emailId => Models.users.find({
  where: {
    email: emailId,
  },
});
