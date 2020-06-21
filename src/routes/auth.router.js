const { Router } = require('express');
const controllers = require('../controllers');
const { validation, validators } = require('../middlewares');

const router = Router();

router.post('/login',
    validators.auth.login,
    validation.validate,
    controllers.auth.login,
);

router.use(controllers.auth.errorHandler);

module.exports = router;
