const joiValidation = require('../utils/helpers/joiValidation');
const encryptUserData = require('../utils/helpers/encryptUserData');
const isExsitingUser = require('../utils/helpers/isExsitingUser');
const createNewUser = require('../utils/helpers/createNewUser');
const getUserFormPayload = require('../utils/helpers/getUserFormPayload');

module.exports = [
  {
    method: 'POST',
    path: '/signup',
    handler: (Request, Response) => {
      const userData = getUserFormPayload(Request);
      if (!joiValidation(userData)) {
        Response('Invalid User Data').code(422);
      } else {
        isExsitingUser(userData.email)
          .then((existingUser) => {
            if (existingUser) {
              Response('User Already Registered').code(409);
            } else {
              createNewUser(encryptUserData(userData))
                .then((databaseMessage) => {
                  if (databaseMessage === 'OK') {
                    Response('User Registered Successfully').code(201);
                  } else {
                    Response('Internal Database Server Error').code(500);
                  }
                });
            }
          });
      }
    },
  },
];
