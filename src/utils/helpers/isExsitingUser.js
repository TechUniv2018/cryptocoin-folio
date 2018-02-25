const Models = require('../../../models');


const isExsitingUser = emailId => Models.users.findAll({
  where: {
    email: emailId,
  },
})
  .then((user) => {
    if (user.length === 0) return false;
    return true;
  })
  .catch(() => true);
module.exports = isExsitingUser;
