const _ = require('lodash');
const { User } = require('../models');
const {
    UserUnauthorizedException,
    UserAlreadyExistsError,
    UserDoesNotExistError,
} = require('../../exceptions/users');
const authService = require('../../services/auth');

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
    return authService.generateToken(rawToken);
}

function get(id) {
    return User.findOne({ _id: id, isActive: true });
}

async function remove(id) {
    let user = User.findById(id);

    if (!user) {
        throw new UserDoesNotExistError();
    }

    return User.findByIdAndDelete(id);
}

async function listAll() {
    return User.find().select('-password');
}

async function partiallyUpdate(id, data) {

    const user = await User.findById({ _id: id }).select('-password');

    if (!user) {
        throw new UserDoesNotExistError();
    }

    return User.findByIdAndUpdate(user._id, { ...data }, { new: true });
}

async function activate(id) {
    const user = await User.findById({ _id: id }).select('-password');
    
    if (!user) {
        throw new UserDoesNotExistError();
    }

    user.isActive = true;
    await user.save();
    return user;
}

async function inactivate(id) {
    const user = await User.findById({ _id: id }).select('-password');
    
    if (!user) {
        throw new UserDoesNotExistError();
    }
    user.isActive = false;
    await user.save();
    return user;
}

module.exports = {
    activate,
    create,
    get,
    inactivate,
    listAll,
    login,
    partiallyUpdate,
    remove
};