const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: String,
    price: String,
    category: String,
    picture: Array,
    name: String,
    vendor: String,
    description: String,
    country_of_origin: String,
    wieght: String,
    param: Array
});

module.exports = mongoose.model('product', productSchema, 'products');