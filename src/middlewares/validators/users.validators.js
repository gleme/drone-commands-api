const { body, param } = require('express-validator');
const { isObjectId } = require('./utils');

function create() {
    return [
        body('firstName')
            .isString()
                .withMessage('field \'firstName\' must be a string')
            .notEmpty()
                .withMessage('field \'firstName\' cannot be an empty string'),
        body('lastName')
            .isString()
                .withMessage('field \'lastName\' must be a string')
            .notEmpty()
                .withMessage('field \'lastName\' cannot be an empty string'),
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

function remove() {
    return [
        param('id')
            .isString()
                .withMessage('field \'id\' must be a string')
            .notEmpty()
                .withMessage('field \'id\' cannot be an empty string')
            .custom(isObjectId),
    ];
}

function partiallyUpdate() {
    return [
        param('id')
            .isString()
                .withMessage('field \'id\' must be a string')
            .notEmpty()
                .withMessage('field \'id\' cannot be an empty string')
            .custom(isObjectId),
        body('firstName')
            .optional()
            .isString()
                .withMessage('field \'firstName\' must be a string')
            .notEmpty()
                .withMessage('field \'firstName\' cannot be an empty string'),
        body('lastName')
            .optional()
            .isString()
                .withMessage('field \'firstName\' must be a string')
            .notEmpty()
                .withMessage('field \'firstName\' cannot be an empty string'),
    ];
}

function activate() {
    return [
        param('id')
            .isString()
                .withMessage('field \'id\' must be a string')
            .notEmpty()
                .withMessage('field \'id\' cannot be an empty string')
            .custom(isObjectId),
    ];
}

function inactivate() {
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
    activate: activate(),
    create: create(),
    inactivate: inactivate(),
    partiallyUpdate: partiallyUpdate(),
    remove: remove(),
};
