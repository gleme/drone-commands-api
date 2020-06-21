const { matchedData } = require('express-validator');
const commandsService = require('../domain/services/commands');
const exceptions = require('../exceptions');

async function create(req, res, next) {
    try {
        const author = req.user;
        const dto = matchedData(req, { onlyValidData: true });
        const command = await commandsService.create(dto, author)
        res.status(201).json(command);    
    } catch (error) {
        next(error);
    }
}

async function listAll(req, res, next) {
    try {
        const commands = await commandsService.listAll();
        res.status(200).json(commands);
    } catch (error) {
        next(error);
    }
}

async function enable(req, res, next) {
    try {
        const command = await commandsService.enable(req.params.id);
        res.status(200).json(command);
    } catch (error) {
        next(error);
    }
}

async function disable(req, res, next) {
    try {
        const command = await commandsService.disable(req.params.id);
        res.status(200).json(command);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        await commandsService.remove(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

async function errorHandler(error, req, res, next) {

    if (error instanceof exceptions.commands.CommandAlreadyExistsError) {
        return res.boom.badRequest(error.message);

    } else if (error instanceof exceptions.commands.CommandDoesNotExistError) {
        return res.boom.notFound(error.message);
    }

    return next(error);
}

module.exports = {
    create,
    disable,
    enable,
    errorHandler,
    listAll,
    remove,
};