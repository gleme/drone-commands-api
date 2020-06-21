const express = require('express');
const passport = require('passport');
const strategies = require('../services/auth/strategies');

const router = express.Router();

router.use('/auth', require('./auth.router'));
router.use('/commands', 
    passport.authenticate(strategies.local.name, { session: false }),
    require('./commands.router')
);
router.use('/users', require('./users.router'));

module.exports = router;
