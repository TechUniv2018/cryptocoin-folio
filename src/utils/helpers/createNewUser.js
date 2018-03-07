const Models = require('../../../models');

const createUser = userInfo => new Promise((resolve, reject) =>
  Models.users.create(userInfo)
    .then(details => resolve(details.dataValues))
    .catch(err => reject(err)));
module.exports = createUser;
