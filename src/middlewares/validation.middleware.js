  
const { validationResult } = require('express-validator');

async function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.boom.badRequest('invalid request data', { errors: errors.array() });
    }

    return next();
}

module.exports = { validate };