const Joi = require('@hapi/joi');

const schema = Joi.object({
    uri: Joi.string().uri().optional(),
    prefix: Joi.string().default('mongodb').optional(),
    hostname: Joi.string().hostname().default('localhost').optional(),
    port: Joi.number().port().default(27017).optional(),
    database: Joi.string().default('alert').optional(),
    authDb: Joi.string().default('admin').optional(),
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    debug: Joi.bool().optional(),
});

const configuration = {
    uri: process.env.MONGODB_URI,
    prefix: process.env.MONGODB_PREFIX,
    hostname: process.env.MONGODB_HOSTNAME,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
    authDb: process.env.MONGODB_AUTH_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    debug: (/^true$|^y(es)?$/ig).test(process.env.MONGODB_DEBUG)
};

const { value, error } = schema.validate(configuration);

if (error) {
    throw error;
}

module.exports = value;