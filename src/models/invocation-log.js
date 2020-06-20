const { Schema, model } = require('mongoose');

const InvocationLogEvent = {
    INVOKED: 'INVOKED',
    STARTED: 'STARTED',
    CANCELLED: 'STOPPED',
};

const schema = new Schema({
    who: { type: Schema.Types.ObjectId, ref: 'User' },
    what: { type: String, enum: Object.values(InvocationLogEvent), default: InvocationLogEvent.INVOKED }
}, {
    timestamps: true,
    versionKey: false
});

const InvocationLog = model('invocationlog', schema);

module.exports = { InvocationLog };