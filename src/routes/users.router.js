const { Router } = require('express');
const controllers = require('../controllers');
const { validation, validators } = require('../middlewares');
const router = Router();

// Creates a new user with 'user' profile
router.post('/',
    validators.users.create,
    validation.validate,
    controllers.users.create,
);

router.use(controllers.users.errorHandler);

module.exports = router;
