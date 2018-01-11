const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: String,
    group: String,
    title: String,
    path: String,
    photo: String,
});

module.exports = mongoose.model('category', categorySchema, 'categories');