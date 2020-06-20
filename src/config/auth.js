const Joi = require('@hapi/joi');

const schema = Joi.object({
    secret: Joi.string().required(),
    expiration: Joi.string().default('1h').optional(),
    saltRounds: Joi.number().integer().default(10).optional()
});

const configuration = {
    secret: process.env.AUTHENTICATION_SECRET,
    expiration: process.env.AUTHENTICATION_EXPIRATION,
    saltRounds: process.env.AUTHENTICATION_SALT_ROUNDS,
};

const { value, error } = schema.validate(configuration);

if (error) {
    throw error;
}

module.exports = value;