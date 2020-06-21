const services = require('../domain/services');
const { UserUnauthorizedException } = require('../exceptions');

async function login(req, res, next) { 
    
    try {
        const token = await services.users.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        
        if (error instanceof UserUnauthorizedException) {
            return res.boom.unauthorized(error.message);
        }

        next(error);
    }
}


module.exports = {
    login,
};
