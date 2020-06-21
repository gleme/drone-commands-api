const { body } = require('express-validator');

function create() {
    return [
        body('firstName')
            .isString()
                .withMessage('field \'firstName\' must be a string')
            .notEmpty()
                .withMessage('field \'firstName\' cannot be an empty string'),
        body('lastName')
            .isString()
                .withMessage('field \'firstName\' must be a string')
            .notEmpty()
                .withMessage('field \'firstName\' cannot be an empty string'),
        body('email')
            .isString()
                .withMessage('field \'email\' must be a string')
            .notEmpty()
                .withMessage('field \'email\' cannot be an empty string')
            .isEmail()
                .withMessage('field \'email\' must be a valid email'),
        // TODO: add password policy
        body('password')
            .isString()
                .withMessage('field \'password\' must be a string')
            .notEmpty()
                .withMessage('field \'password\' cannot be an empty string'),
    ];
}

module.exports = {
    create: create(),
}