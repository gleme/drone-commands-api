const { param } = require('express-validator');
const { isObjectId } = require('./utils');

function get() {
    return [
        param('id')
            .isString()
                .withMessage('field \'id\' must be a string')
            .notEmpty()
                .withMessage('field \'id\' cannot be an empty string')
            .custom(isObjectId),
    ];
}

module.exports = {
    get: get(),
};
