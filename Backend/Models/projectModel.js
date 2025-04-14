const { Schema, model } = require('../connection');

const projectSchema = new Schema({
    title: String,
    description: String,
    language: String,
    duration: String,
    deadline: String,
    tags: Array,
    companyName: String,
    image: String,
    createdAt: {type: Date, default: Date.now }
});

module.exports = model('project', projectSchema);


// title
// difficulty
// image
// description
// stack
// language
// tags : Array
// createdAt: date