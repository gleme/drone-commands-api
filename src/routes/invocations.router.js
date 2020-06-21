const { Router } = require('express');
const controllers = require('../controllers');
const { validation, validators } = require('../middlewares');

const router = Router();

router.get('/',
    controllers.invocations.listAll,
);

router.get('/:id',
    validators.invocations.get,
    validation.validate,
    controllers.invocations.get,
);

router.use(controllers.invocations.errorHandler);

module.exports = router;