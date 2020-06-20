const _ = require('lodash');
const { User } = require('../models');
const { auth } = require('../services');
const exceptions = require('../exceptions');

async function create(dto) {

    const { email, firstName, lastName, password} = dto;
    const hashedPassword = await auth.encrypt(password);
    const user = await User.create({
       firstName,
       lastName,
       email,
       password: hashedPassword, 
    });

    return _.pick(user, 'firstName', 'lastName', 'email', '_id');
}

async function login(dto) {

    const { email, password } = dto;
    const user = User.findByEmail(email);
    const isValidPassword = auth.verifyEncrypted(password, user.password);

    if (!isValidPassword) {
        throw new exceptions.UserUnauthorizedException();
    }

    const rawToken = _.pick(user, '_id', 'firstName', 'lastName', 'role');
    return auth.generateToken(rawToken);
}

function get(id) {
    return User.findOne({ _id: id, active: true });
}



module.exports = {
    create,
    login,
    get,
};