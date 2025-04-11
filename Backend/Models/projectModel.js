const { Schema, model } = require('../connection');

const projectSchema = new Schema({
    title: String,
   // stack: String,
    difficulty: String,
    description: String,
    language: String,
    image: String,
    tags: Array,
    createdAt: Date
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