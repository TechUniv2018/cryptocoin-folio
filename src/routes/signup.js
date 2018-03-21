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
                  const expectedOutput = ['createdAt',
                    'email',
                    'fullName',
                    'id',
                    'mobileNumbe',
                    'password',
                    'updatedAt'];
                  if (Object.keys(databaseMessage).sort().toString() === expectedOutput.sort().toString()) {
                    console.log('pass');
                    Response('User Registered Successfully').code(201);
                  } else {
                    console.log('fail');
                    Response('Internal Database Server Error').code(500);
                  }
                });
            }
          });
      }
    },
  },
];
