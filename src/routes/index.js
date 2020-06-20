const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const usersRouter = require('./users.router');
const commandsRouter = require('./commands.router');

router.user('/auth', authRouter);
router.use('/commands', commandsRouter);
router.use('/users', usersRouter);

module.exports = router;
