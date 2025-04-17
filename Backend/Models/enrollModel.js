const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    user: {type: Types.ObjectId, ref: 'users', require: true},
    project: {type: Types.ObjectId, ref: 'project', require: true},
    status: {type: String, enum: ['enrolled', 'completed', 'in progress'], default: 'enrolled'},
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('enrollment', mySchema);