

class InvocationDoesNotExistError extends Error {
    constructor(message) {
        super(message || 'Invocation does not exist');
        this.name = 'InvocationDoesNotExistError';
    }
}

module.exports = {
    InvocationDoesNotExistError,
};
