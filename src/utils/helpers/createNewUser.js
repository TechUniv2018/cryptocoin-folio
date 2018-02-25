const Models = require('../../../models');

const createUser = userInfo => new Promise((resolve, reject) =>
  Models.users.create(userInfo)
    .then(resolve('OK'))
    .catch(err => reject(err)));
module.exports = createUser;
