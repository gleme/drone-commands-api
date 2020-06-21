const { Invocation } = require('../models');
const { InvocationDoesNotExistError } = require('../../exceptions/invocations');

async function get(id) {
    const invocation = await Invocation.findById(id)
        .populate('logs')
        .populate('user', '-password')
        .populate('command');

    if (!invocation) {
        throw new InvocationDoesNotExistError();
    }

    return invocation;
}

function listAll() {
    return Invocation.find();
}

module.exports = {
    get,
    listAll,
};
