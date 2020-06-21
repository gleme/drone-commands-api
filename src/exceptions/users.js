
class UserAlreadyExistsError extends Error {
    constructor(message) {
        super(message || 'User with this email already exists');
        this.name = 'UserAlreadyExistsError';
    }
}

class UserUnauthorizedError extends Error {
    constructor(message) {
        super(message || 'Invalid credentials');
        this.name = 'UserUnauthorizedError';
    }
}

module.exports = {
    UserUnauthorizedError,
    UserAlreadyExistsError,
};
