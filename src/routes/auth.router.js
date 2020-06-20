const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/login',
    controllers.auth.login
);


module.exports = router;
