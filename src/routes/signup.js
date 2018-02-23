const Joi = require('joi');
const PasswordHash = require('password-hash');
const Models = require('../../models');

const validateFormData = (userData) => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    mobileNumbe: Joi.number().min(1000000000).max(9999999999),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({
      language: {
        any: {
          allowOnly: 'must match password',
        },
      },
    }),
  });
  const result = Joi.validate(userData, schema);
  if (result.error) {
    return false;
  }
  return true;
};

const encryptPassword = (plainPassword) => {
  const encryptedPassword = PasswordHash.generate(plainPassword);
  return encryptedPassword;
};

const findUsersByEmail = (emailId) => {
  const userslist = Models.users.findAll({
    where: {
      email: emailId,
    },
  });
  return userslist;
};

const createValidateFormData = formData => ({
  fullName: formData.fullName,
  email: formData.email,
  mobileNumbe: formData.mobileNumbe,
  password: encryptPassword(formData.password),
});

const getPayload = (data) => {
  if (typeof data.payload === 'string') {
    return JSON.parse(data.payload);
  }
  return data.payload;
};

module.exports = [
  {
    method: 'POST',
    path: '/signup',
    handler: (Request, Response) => {
      const formData = getPayload(Request);

      if (!validateFormData(formData)) {
        Response('Invalid User Data').code(422);
      } else {
        const validFormData = createValidateFormData(formData);
        const emailPromise = findUsersByEmail(validFormData.email);
        emailPromise.then((result) => {
          if (result.length === 0) {
            console.log(validFormData);
            Models.users.create(validFormData)
              .then(() => {
                Response('User Registered Successfully').code(201);
              }).catch(() => {
                Response('User couldnt be stored in the Database! Sorry').code(500);
              });
          } else {
            Response('User Already Registered').code(409);
          }
        });
      }
    },
  },
];
