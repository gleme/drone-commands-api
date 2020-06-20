const { users } = require('../services');

async function create(req, res, next) { 
    try {
        const createUserDto = users.create(req.body);
        res.status(201).json(createUserDto);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    create,
};
