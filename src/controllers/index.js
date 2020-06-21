const auth = require('./auth.controller');
const commands = require('./commands.controller');
const users = require('./users.controller');
const invocations = require('./invocations.controller');

module.exports = {
    auth,
    commands,
    invocations,
    users,
};