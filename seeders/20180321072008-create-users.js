const Models = require('../models');
const encryptPassword = require('../src/utils/helpers/encryptPassword');

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    Models.user.bulkCreate([{
      id: 1,
      fullName: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
    }, {
      fullName: 'Paul McCartney',
      email: 'paul@gmail.com',
      password: encryptPassword('paul123'),
      mobileNumbe: 9944198887,
    }, {
      fullName: 'John Lennon',
      email: 'John@gmail.com',
      password: encryptPassword('paul123'),
      mobileNumbe: 9431908524,
    }]),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    Models.users.destroy({
      truncate: true,
      cascade: true,
    }),
};
