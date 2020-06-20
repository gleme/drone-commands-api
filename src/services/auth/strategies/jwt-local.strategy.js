const { ExtractJwt, Strategy } = require('passport-jwt');
const _ = require('lodash');
const { auth } = require('../../../config');
const usersService = require('../../users');

const strategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: auth.secret,
}, async ({ _id }, done) => {
    try {
        const user = await usersService.get(_id);
        if (!user) {
            return done(null, false);
        }

        return done(null, _.pick(user, '_id', 'email', 'firstName', 'lastName', 'role'));

    } catch (error) {
        done(error);
    }
});


module.exports = {
    name: 'local-jwt',
    strategy,    
};
