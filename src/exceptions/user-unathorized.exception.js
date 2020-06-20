
class UserUnauthorizedException extends Error {
    constructor() {
        super('Invalid credentials');
        this.name = 'UserUnauthorizedException';
    }
}

module.exports = {
    UserUnauthorizedException,
};
