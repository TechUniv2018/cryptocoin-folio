const joiLoginValidation = require('../utils/helpers/joiLoginValidation');
const getUserFormPayload = require('../utils/helpers/getUserFormPayload');
const verifyPassword = require('../utils/helpers/verifyPassword');
const fetchUserDetails = require('../utils/helpers/fetchUserDetails');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: (Request, Response) => {
      const userData = getUserFormPayload(Request);
      if (joiLoginValidation(userData) === false) {
        Response('Invalid User Data').code(422);
      } else {
        fetchUserDetails(userData.email)
          .then((result) => {
            const details = result[0].dataValues;
            if (details.length === 0) {
              Response('User Not Registered').code(409);
            } else {
              const passwordMatch = verifyPassword(userData.password, details.password);
              if (passwordMatch === false) {
                Response('Invalid Password').code(422);
              } else {
                Response('log In Success').code(200);
              }
            }
          });
      }
    },
  },
];

