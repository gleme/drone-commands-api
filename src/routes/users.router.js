const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/',
    controllers.users.create,
);


module.exports = router;
