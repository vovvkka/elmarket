const express = require('express');
const router = express.Router();
const Category = require("../models/Category");

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({}, 'title').populate('subCategories', 'title');
        res.send(categories);
    } catch (e) {
        res.status(500).send(e);
    }
});



module.exports = router;