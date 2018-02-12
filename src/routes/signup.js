const Joi = require('joi');

const validateFormData = (userData) => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    mobileNumber: Joi.number().min(1000000000).max(9999999999),
  });
  const result = Joi.validate(userData, schema);
  if (result.error) {
    return false;
  }
  return true;
};

module.exports = [
  {
    method: 'POST',
    path: '/signup',
    handler: (Request, Response) => {
      const formData = Request.payload;
      if (!validateFormData(formData)) {
        Response('invalid input').code(401);
      } else {
        Response('Valid Input').code(200);
      }
    },
  },
];
