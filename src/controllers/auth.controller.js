const { matchedData } = require('express-validator');
const userService = require('../domain/services/users');
const { UserUnauthorizedError } = require('../exceptions/users');

async function login(req, res, next) { 
    
    try {
        const dto = matchedData(req, { onlyValidData: true });
        const token = await userService.login(dto);
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof UserUnauthorizedError) {
            return res.boom.unauthorized(error.message);
        }

        next(error);
    }
}


module.exports = {
    login,
};
