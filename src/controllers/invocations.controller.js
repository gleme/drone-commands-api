const invocationsService = require('../domain/services/invocation');
const { InvocationDoesNotExistError } = require('../exceptions/invocations');

async function listAll(req, res, next) {
    try {
        const invocations = await invocationsService.listAll();
        res.status(200).json(invocations);
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {
        const invocation = await invocationsService.get(req.params.id);
        res.status(200).json(invocation);
    } catch (error) {
        next(error);
    }
}

function errorHandler(error, req, res, next) {
    if (error instanceof InvocationDoesNotExistError) {
        return res.boom.notFound(error.message);
    }

    next(error);
}

module.exports = {
    errorHandler,
    get,
    listAll,
};
