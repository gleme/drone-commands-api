
const userService = require('../services/users');
const { UserUnauthorizedError, UserAlreadyExistsError } = require('../exceptions/users');

async function create(req, res, next) { 
    try {
        const createUserDto = await userService.create(req.body);
        res.status(201).json(createUserDto);
    } catch (error) {
        next(error);
    }
}

async function errorHandler(error, req, res, next) {

    if (error instanceof UserAlreadyExistsError) {
        return res.boom.badRequest(error.message);

    } else if (error instanceof UserUnauthorizedError) {
        return res.boom.unauthorized(error.message);
    }

    return next(error);

}


module.exports = {
    create,
    errorHandler,
};
