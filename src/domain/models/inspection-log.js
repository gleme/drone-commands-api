const { Schema, model } = require('mongoose');

const InspectionLogEvent = {
    INVOKED: 'INVOKED',
    STARTED: 'STARTED',
    CANCELLED: 'STOPPED',
};

const schema = new Schema({
    who: { type: Schema.Types.ObjectId, ref: 'User' },
    what: { type: String, enum: Object.values(InspectionLogEvent), default: InspectionLogEvent.INVOKED }
}, {
    timestamps: true,
    versionKey: false
});

const InspectionLog = model('inspectionlog', schema);

module.exports = { InspectionLog, InspectionLogEvent };
