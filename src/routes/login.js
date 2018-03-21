const joiLoginValidation = require('../utils/helpers/joiLoginValidation');
const getUserFormPayload = require('../utils/helpers/getUserFormPayload');
const verifyPassword = require('../utils/helpers/verifyPassword');
const fetchUserDetails = require('../utils/helpers/fetchUserDetails');
const createToken = require('../utils/helpers/createToken');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: (Request, Response) => {
      const userData = getUserFormPayload(Request);
      if (joiLoginValidation(userData) === false) {
        Response({
          code: 409,
          message: 'Invalid Request',
        });
      } else {
        fetchUserDetails(userData.email)
          .then((result) => {
            if (result !== null && verifyPassword(userData.password, result.dataValues.password)) {
              Response({
                code: 200,
                token: createToken(result.dataValues),
                message: 'Logged in',
                username: result.dataValues.fullName,
              });
            } else {
              Response({
                code: 409,
                message: 'Invalid Request',
              });
            }
          })
          .catch(() => {
            Response({
              code: 500,
              message: 'Internal Server Error',
            });
          });
      }
    },
  },
];

