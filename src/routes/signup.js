const Joi = require('joi');
const PasswordHash = require('password-hash');

const validateFormData = (userData) => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    mobileNumber: Joi.number().min(1000000000).max(9999999999),
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

module.exports = [
  {
    method: 'POST',
    path: '/signup',
    handler: (Request, Response) => {
      const formData = Request.payload;
      if (!validateFormData(formData)) {
        Response('Invalid Input').code(400);
      } else {
        const validFormData = {
          fullName: formData.fullName,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
        };
        validFormData.password = encryptPassword(formData.password);
        Response('Valid Input').code(200);
      }
    },
  },
];
