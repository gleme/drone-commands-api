const auth = require('./auth.validators');
const commands = require('./commands.validators');
const users = require('./users.validators');
const invocations = require('./invocation.validators');

module.exports = {
    auth,
    commands,
    invocations,
    users,
};
