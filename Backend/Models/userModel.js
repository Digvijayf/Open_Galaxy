const { default: mongoose } = require('mongoose');
const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, require: true },
    password: { type: String, require: true },
    city:{type:String, default:'unknown'},
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('users', mySchema);