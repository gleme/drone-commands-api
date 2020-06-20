const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/',
    controllers.commands.create
);


module.exports = router;