
class CommandAlreadyExistsError extends Error {
    constructor(message) {
        super(message || 'Command with this name or code already exists');
        this.name = 'CommandAlreadyExistsError';
    }
}

class CommandDoesNotExistError extends Error {
    constructor(message) {
        super(message || 'Command does not exist');
        this.name = 'CommandDoesNotExistError';
    }
}

module.exports = {
    CommandAlreadyExistsError,
    CommandDoesNotExistError,
};
