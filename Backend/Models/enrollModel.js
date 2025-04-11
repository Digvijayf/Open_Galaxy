const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    user: {type: Types.ObjectId, ref: 'users', require: true},
    project: {type: Types.ObjectId, ref: 'project', require: true},
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('enrollment', mySchema);