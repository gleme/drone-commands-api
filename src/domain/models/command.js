const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    executablePath: { type: String, required: true },
    arguments: [{ type: String, default: [] }],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    enabled: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});

schema.statics.findByName = function(name) {
    return this.findOne({ name });
}

const Command = model('command', schema);

module.exports = {
    Command
};