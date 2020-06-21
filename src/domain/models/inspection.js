
const { Schema, model } = require('mongoose');
const async = require('async');

const InspectionStatus = {
    EXECUTING: 'EXECUTING',
    STOPPED: 'STOPPED',
    FINISHED_EXECUTION: 'FINISHED_EXECUTION',
    WARN: 'WARN',
    ERROR: 'ERROR',
};

const schema = new Schema({
    status: {
        type: String,
        enum: Object.values(InspectionStatus),
        required: true,
        default: InspectionStatus.EXECUTING,
    },
    requestId: { type: String, unique: true, required: true },
    messageId: { type: String, unique: true, required: true },
    command: { type: Schema.Types.ObjectId, ref: 'Command', required: true },
    result: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    logs: [{ type: Schema.Types.ObjectId, ref: 'InspectionLog', default: [] }],
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

const Inspection = model('inspection', schema);

module.exports = {
    Inspection,
    InspectionStatus,
};