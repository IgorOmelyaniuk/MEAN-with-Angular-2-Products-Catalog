var express = require('express');
var router = express.Router();
const Section = require('../models/section');
const Group = require('../models/group');
const Category = require('../models/category');

router.get('/', (req, res, next) => {
    Section.find({}, function(err, sections) {
        if(err) res.send(err);
        res.json(sections);
    });
});

router.get('/:section', (req, res, next) => {
    Group.find({section: req.params.section}, function(err, groups) {
        if(err) res.send(err);
        res.json(groups);
    });
});

router.get('/:section/:group', (req, res, next) => {
    Category.find({group: req.params.group}, function(err, categories) {
        if(err) res.send(err);
        res.json(categories);
    });
});

module.exports = router;