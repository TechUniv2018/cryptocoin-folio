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
        Response('Invalid User Data').code(422);
      } else {
        fetchUserDetails(userData.email)
          .then((result) => {
            if (result === null) {
              Response({
                code: 409,
                message: 'User Not Registered',
              });
            } else {
              const passwordMatch = verifyPassword(userData.password, result.dataValues.password);
              if (passwordMatch === false) {
                Response({
                  code: 422,
                  message: 'Invalid Password',
                });
              } else {
                Response({
                  code: 200,
                  token: createToken(result.dataValues),
                  message: 'Logged in',
                  username: result.dataValues.fullName,
                });
              }
            }
          });
      }
    },
  },
];

