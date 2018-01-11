const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const filterSchema = new Schema({
    title: String,
    category: String,
    brands: Array,
    minPrice: String,
    maxPrice: String,
    params: Array
});

module.exports = mongoose.model('filter', filterSchema, 'filters');