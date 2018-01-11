let express = require('express');
let router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');

router.get('/', (req, res, next) => {
    Category.find({}, function(err, categories) {
        if(err) res.send(err);
        res.json(categories);
    });
});

router.get('/:category/:searchString/:lastIndex', (req, res, next) => {
    let queryArr = getWords((req.params.searchString).toLowerCase()),
        lastIndex = +req.params.lastIndex;

    Product.find({category: req.params.category}, function(err, products) {
        let productsNumber = products.length;
        searchProducts = [];

        for(let i = lastIndex + 1; i < productsNumber; i++) {
            let nameArr = getWords(products[i].name),
                isExist = false;

            for(let k = 0; k < queryArr.length; k++) {
                for(let j = 0; j < nameArr.length; j++) {
                    if(nameArr[j].indexOf(queryArr[k]) === 0) {
                        isExist = true;
                        break;
                    } else isExist = false;
                }
                if(!isExist) break;
            }

            if(isExist) searchProducts.push(products[i]);
            lastIndex = i;
            if(searchProducts.length === 10) break;
        }

        let result = { products: searchProducts, lastIndex: lastIndex };
        if(err) res.send(err);
        res.json(result);
    });
});

module.exports = router;

function getWords(name) {
    let nameArr = name.toLowerCase().split(' ');
    return nameArr;
}

