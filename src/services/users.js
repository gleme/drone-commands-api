const _ = require('lodash');
const { User } = require('../models');
const { UserUnauthorizedException, UserAlreadyExistsError } = require('../exceptions/users');
const authService = require('./auth');

async function create(dto) {

    const { email, firstName, lastName, password} = dto;

    let user = await User.findOne({ email });
    
    if (user) {
        throw new UserAlreadyExistsError();
    }

    const hashedPassword = await authService.encrypt(password);
    
    user = await User.create({
       firstName,
       lastName,
       email,
       password: hashedPassword, 
    });

    return _.pick(user, 'firstName', 'lastName', 'email', '_id');
}

async function login(dto) {

    const { email, password } = dto;
    const user = await User.findOne({ email });
    const isValidPassword = authService.verifyEncrypted(password, user.password);

    if (!isValidPassword) {
        throw new UserUnauthorizedException();
    }

    const rawToken = _.pick(user, '_id', 'firstName', 'lastName', 'role');
    return auth.generateToken(rawToken);
}

function get(id) {
    return User.findOne({ _id: id, active: true });
}

module.exports = {
    create,
    get,
    login,
};