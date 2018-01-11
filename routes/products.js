var express = require('express');
var router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');

router.get('/', (req, res, next) => {
    
    Product.find({isNew: 'true'}, function(err, products) {
        let newProducts = [];

        for(let i = 0; i < 8; i++) {
            newProducts.push(products[i]);
            if(newProducts.length === 8) break;
        }
        if(err) res.send(err);
        res.json(newProducts);
    });
});

router.get('/:category', (req, res, next) => {
    let categoryProducts;
    Product.find({category: req.params.category}, function(err, products) {
        if(err) res.send(err);
        res.json(products);
    });
});

router.get('/:category/:id', (req, res, next) => {
    Product.findById(req.params.id, function(err, product) {
        if(err) res.send(err);
        res.json(product);
    });
});

module.exports = router;