const { Router } = require('express');
const controllers = require('../controllers');
const { validation, validators } = require('../middlewares');

const router = Router();

router.post('/',
    validators.commands.create,
    validation.validate,
    controllers.commands.create,
);

router.get('/',
    controllers.commands.listAll,
);

router.patch('/:id/disable',
    validators.commands.disable,
    validation.validate,
    controllers.commands.disable,
);

router.patch('/:id/enable',
    validators.commands.enable,
    validation.validate,
    controllers.commands.enable,
);

router.delete('/:id',
    validators.commands.remove,
    validation.validate,
    controllers.commands.remove,
);

router.use(controllers.commands.errorHandler);

module.exports = router;