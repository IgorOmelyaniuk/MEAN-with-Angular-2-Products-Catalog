const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    _id: String,
    title: String,
    path: String,
    photo: String,
});

module.exports = mongoose.model('section', sectionSchema, 'sections');