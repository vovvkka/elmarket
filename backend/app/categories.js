const express = require('express');
const router = express.Router();
const Category = require("../models/Category");

router.get('/', async (req, res) => {
    try {

        if (req.query.toOptions) {
            const categories = await Category.find();

            const categoryOptions = categories.map(c => {
                return {_id: c._id, label: c.title, value: c._id}
            });

            return res.send(categoryOptions);
        }

        const categories = await Category.find().populate('subCategories', 'title');
        res.send(categories);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/popular', async (req, res) => {
    try {
        const categories = await Category.find({isPopular: true}).limit(8);
        res.send(categories);
    } catch (e) {
        res.status(500).send(e);
    }
});



module.exports = router;