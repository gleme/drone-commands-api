
const { body } = require('express-validator');

function login() {
    return [
        body('email')
            .isString()
                .withMessage('field \'email\' must be a string')
            .notEmpty()
                .withMessage('field \'email\' cannot be an empty string')
            .isEmail()
                .withMessage('field \'email\' must be a valid email'),
        body('password')
            .isString()
                .withMessage('field \'password\' must be a string')
            .notEmpty()
                .withMessage('field \'password\' cannot be an empty string'),
    ];
}

module.exports = {
    login: login(),
};
