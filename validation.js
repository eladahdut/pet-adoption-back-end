const Joi = require("joi");

//Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .min(2)
      .max(50)
      .regex(/^\w+(?:\s+\w+)*$/),
    lastName: Joi.string().alphanum().min(2).max(30).required(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: [ "com", "net" ] } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeatPassword: Joi.ref("password"),
    likedPets: Joi.array().items(Joi.string()),
    fosterdPets: Joi.array().items(Joi.string()),
    adoptedPets: Joi.array().items(Joi.string()),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: [ "com", "net" ] } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    likedBy: Joi.array().items(Joi.string()),
    fosteredBy: Joi.string(),
    adoptedBy: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

//validate data before creating user
// const { error } = schema.validate(req.body);
// if (error) return res.status(400).send(error.details[ 0 ].message)
