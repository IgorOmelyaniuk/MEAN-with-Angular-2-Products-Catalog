const mongoose = require('mongoose');
const config = require('../config/database');

// Review Schema
const ReviewSchema = mongoose.Schema({
     user: {
        type: Object,
        require: true
     },
     date: {
         type: Date,
         require: true
     },
     productId: {
         type: String,
         require: true
     },
     text: {
         type: String,
         require: true
     }
});

const Review = module.exports = mongoose.model('Review', ReviewSchema);