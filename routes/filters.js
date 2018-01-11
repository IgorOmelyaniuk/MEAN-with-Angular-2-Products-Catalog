let express = require('express');
let router = express.Router();
const Filter = require('../models/filter');
const Product = require('../models/product');

router.get('/:category', (req, res, next) => {
    Filter.findOne({category: req.params.category}, function(err, filter) {
        if(err) res.send(err);
        res.json(filter);
    });
});

router.post('/:category/filter-products', (req, res, next) => {
    let filter = req.body.filter,
    facetParams = [],
    facets = [],
    filterProducts = [],
    brands = [],
    rangeArr = [];

    filter.params.forEach(param => {

        //If facet - checkbox
        if(param.type === 'checkbox') {
            param.values.forEach(value => {
                if(value.checked) facetParams.push(value.name);
            });
            let facet = {
                title:  param.title,
                values: facetParams
            };
            if(facet.values.length > 0) {
                facets.push(facet);
                facetParams = [];
            }
        }

        //If facet - range
        if(param.type === 'range') {
            let facet = {
                title: param.title,
                minValue: param.minValue,
                maxValue: param.maxValue
            }
            rangeArr.push(facet);
        }
    });

    filter.brands.forEach(brand => {
        if(brand.checked) brands.push(brand.name);
    });



    Product.find({category: req.params.category}, function(err, products) {
        //Filter Brands
        if(brands.length > 0) {
            products.forEach(product => {
                brands.forEach(brand => {
                    if (product.vendor === brand) filterProducts.push(product);
                });
            });
            products = filterProducts;
            filterProducts = [];
        }
    

        //Filter Price
        if (filter.maxPrice >= 0 && filter.minPrice >= 0) {
            filterProducts = products.filter(product => {
                return +product.price <= filter.maxPrice && +product.price >= filter.minPrice;
            });
            products = filterProducts;
            filterProducts = []
        }

        //Filter Params
        if (facets.length > 0) {
            facets.forEach(facet => {
                products.forEach(product => {
                    product.param.forEach(param => {
                        if (param._name === facet.title) {
                            facet.values.forEach(value => {
                                if(param.__text === value) filterProducts.push(product);
                            });
                        }
                    });
                });
                products = filterProducts;
                filterProducts = [];
            });
        }

        // Filter Range
        if(rangeArr.length > 0) {
            rangeArr.forEach(range => {
                products.forEach(product => {
                    product.param.forEach(param => {
                        if(param._name === range.title) {
                            if(+param.__text >= range.minValue && +param.__text <= range.maxValue)
                                filterProducts.push(product);
                        }
                    });
                });
                products = filterProducts;
                filterProducts = [];
            });
        }

        if(err) res.send(err);
        res.json(products);
    });
});

module.exports = router;