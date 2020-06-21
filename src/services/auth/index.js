const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { auth } = require('../../config');

async function encrypt(data) {
    return bcrypt.hash(data, auth.saltRounds)
}

function verifyEncrypted(rawData, encryptedData) {
    return bcrypt.compare(rawData, encryptedData);
}

function generateToken(data) {
    return jwt.sign(data, auth.secret, { expiresIn: auth.expiration });
}

module.exports = {
    encrypt,
    generateToken,
    verifyEncrypted,
};
