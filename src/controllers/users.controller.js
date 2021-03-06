
const _ = require('lodash');
const { matchedData } = require('express-validator');
const usersService = require('../domain/services/users');
const {
    UserUnauthorizedError,
    UserAlreadyExistsError,
    UserDoesNotExistError,
} = require('../exceptions/users');

async function create(req, res, next) { 
    try {
        const dto = matchedData(req, { onlyValidData: true });
        const createUserDto = await usersService.create(dto);
        res.status(201).json(createUserDto);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        await usersService.remove(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

async function listAll(req, res, next) {
    try {
        const users = await usersService.listAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

async function partiallyUpdate(req, res, next) {
    try {
        const updateData = matchedData(req, { onlyValidData: true });
        const user = await usersService.partiallyUpdate(req.params.id, updateData);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function activate(req, res, next) {
    try {
        const user = await usersService.activate(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function inactivate(req, res, next) {
    try {
        const user = await usersService.inactivate(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function errorHandler(error, req, res, next) {

    if (error instanceof UserAlreadyExistsError) {
        return res.boom.badRequest(error.message);

    } else if (error instanceof UserUnauthorizedError) {
        return res.boom.unauthorized(error.message);

    } else if (error instanceof UserDoesNotExistError) {
        return res.boom.notFound(error.message);
    }

    return next(error);
}


module.exports = {
    activate,
    create,
    errorHandler,
    inactivate,
    listAll,
    partiallyUpdate,
    remove,
};
