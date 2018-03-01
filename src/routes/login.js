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
              Response('User Not Registered').code(409);
            } else {
              const passwordMatch = verifyPassword(userData.password, result.dataValues.password);
              if (passwordMatch === false) {
                Response('Invalid Password').code(422);
              } else {
                Response(createToken(result.dataValues)).code(200);
              }
            }
          });
      }
    },
  },
];

