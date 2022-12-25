const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().populate('subCategories', 'title');
        res.send(categories);
    } catch (e) {
        res.status(500).send(e);
    }
});



module.exports = router;