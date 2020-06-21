const { Schema, model } = require('mongoose');

const UserRoles = Object.freeze({
    ADMIN: 'admin',
    INSPECTOR: 'inspector',
    USER: 'user',
});


const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: UserRoles.USER, enum: Object.values(UserRoles) },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});

const User = model('User', schema);

module.exports = {
    User,
    UserRoles,
};