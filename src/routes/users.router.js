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

router.get('/',
    controllers.users.listAll,
);

router.patch('/:id',
    validators.users.partiallyUpdate,
    validation.validate,
    controllers.users.partiallyUpdate,
);

router.patch('/:id/activate',
    validators.users.activate,
    validation.validate,
    controllers.users.activate,
);

router.patch('/:id/inactivate',
    validators.users.inactivate,
    validation.validate,
    controllers.users.inactivate,
);

router.delete('/:id',
    validators.users.remove,
    validation.validate,
    controllers.users.remove,
);

router.use(controllers.users.errorHandler);

module.exports = router;
