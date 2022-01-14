const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "string.email":
                err.message = `Pole powinno zawierać prawidłowy adres email`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const animalSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
    ,
    animalName: Joi.string()
        .min(2)
        .max(40)
        .required()
        .error(errMessages)
    ,
    species: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    birthDate: Joi.date()
        .optional()
        .allow("")
        .error(errMessages)
    ,
    age: Joi.number()
        .max(25)
        .error(errMessages)
    ,
    kidFriendly: Joi.string()
        .min(3)
        .max(3)
        .required()
        .error(errMessages)
    ,
    adopt_id: Joi.number()
        .required()
        .error(errMessages)
    ,
    vol_id: Joi.number()
        .required()
        .error(errMessages)
});

module.exports = animalSchema;