
const { body, param } = require('express-validator');
const { isObjectId } = require('./utils');

function create() {
    return [
        body('name')
            .isString()
                .withMessage('field \'name\' must be a string')
            .notEmpty()
                .withMessage('field \'name\' cannot be an empty string'),
        body('code')
            .isString()
                .withMessage('field \'code\' must be a string')
            .notEmpty()
                .withMessage('field \'code\' cannot be an empty string'),
        body('executablePath')
            .isString()
                .withMessage('field \'executablePath\' must be a string')
            .notEmpty()
                .withMessage('field \'executablePath\' cannot be an empty string'),
        body('arguments')
            .optional()
            .isArray()
                .withMessage('field \'arguments\' must be an array'),
        body('arguments.*')
            .isString()
                .withMessage('arguments values must be strings')
    ];
}

function enable() {
    return [
        param('id')
            .isString()
                .withMessage('field \'id\' must be a string')
            .notEmpty()
                .withMessage('field \'id\' cannot be an empty string')
            .custom(isObjectId),
    ];
}

function disable() {
    return [
        param('id')
            .isString()
                .withMessage('field \'id\' must be a string')
            .notEmpty()
                .withMessage('field \'id\' cannot be an empty string')
            .custom(isObjectId),
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

module.exports = {
    create: create(),
    disable: disable(),
    enable: enable(),
    remove: remove(),
};
