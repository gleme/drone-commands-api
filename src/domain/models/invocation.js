
const { Schema, model } = require('mongoose');
const async = require('async');

const InvocationStatus = {
    EXECUTING: 'EXECUTING',
    STOPPED: 'STOPPED',
    FINISHED_EXECUTION: 'FINISHED_EXECUTION',
    WARN: 'WARN',
    ERROR: 'ERROR',
};

const Commands = {
    INICIAR: 'INICIAR',
    INTERROMPER: 'INTERROMPER',
    PAUSAR: 'PAUSAR',
};


const schema = new Schema({
    command: { type: String, enum: Object.values(Commands), required: true },
    status: {
        type: String,
        enum: Object.values(InvocationStatus),
        required: true,
        default: InvocationStatus.EXECUTING,
    },
    requestId: { type: String, unique: true, required: true },
    messageId: { type: String, unique: true, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    logs: [{ type: Schema.Types.ObjectId, ref: 'InvocationLog' }],
}, {
    timestamps: true,
    versionKey: false
});

// TODO: adds possibility to select fields and sorting
schema.statics.getCollection = function ({ query, skip, limit }) {
    return async.parallel({
        results: callback => {
            this.find(query)
                .skip(skip)
                .limit(limit)
                .select('-logs')
                .sort([['createdAt', -1]])
                .then(results => callback(null, results))
                .catch(error => callback(error));
        },
        count: callback => {
            this.countDocuments(query)
                .then(count => callback(null, count))
                .catch(error => callback(error));
        }
    });
};

const Invocation = model('invocation', schema);

module.exports = {
    Invocation,
    InvocationStatus,
};