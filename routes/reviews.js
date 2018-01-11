var express = require('express');
var router = express.Router();
const Review = require('../models/review');

router.get('/:id', (req, res, next) => {
    Review.find({productId: req.params.id}, (err, reviews) => {
        if(err) res.send(err);
        res.json(reviews);
    });
});

router.post('/add', (req, res, next) => {
    let newReview = new Review({
        user: req.body.user,
        productId: req.body.productId,
        text: req.body.text,
        date: req.body.date
    });

    Review.create(newReview, (err, review) => {
        if(err) {
            res.json({success: false});
        } else {
            res.json(review);
        }
    });
});

module.exports = router;