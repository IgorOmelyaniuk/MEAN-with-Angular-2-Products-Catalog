const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    _id: String,
    section: String,
    title: String,
    path: String,
});

module.exports = mongoose.model('group', groupSchema, 'groups');