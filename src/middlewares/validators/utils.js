
const { Types } = require('mongoose');

function isObjectId(value) {
    if (!Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }
    return true;
}

module.exports = {
    isObjectId,
};
