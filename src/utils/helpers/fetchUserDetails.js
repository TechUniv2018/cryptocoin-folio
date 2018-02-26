const Models = require('../../../models');

const fetchUserDetails = emailId => Models.users.findAll({
  where: {
    email: emailId,
  },
})
  .then((user) => user)
  .catch(() => true);
  
module.exports = fetchUserDetails;
