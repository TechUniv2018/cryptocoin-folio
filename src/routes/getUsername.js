const Models = require('../../models');

module.exports = [{
  path: '/getUsername',
  method: 'GET',
  handler: (request, response) => {
    const { username, curr } = request.query;
    Models.users.findAll({
      where: {
        [Models.Sequelize.Op.and]: {
          fullName: {
            $like: `%${username}%`,
          },
          [Models.Sequelize.Op.not]: {
            [Models.Sequelize.Op.or]: [{
              fullName: curr,
            }, {
              fullName: 'admin',
            }],
          },
        },
      },
      attributes: ['id', 'fullName'],
    }).then((users) => {
      if (users !== null) {
        return response(users).code(200);
      }
      return response([]).code(200);
    });
  },
}];
