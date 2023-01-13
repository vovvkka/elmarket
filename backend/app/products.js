const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

router.get('/', async (req, res) => {
    try {
        const query = {};
        let products;

        if (req.query.search) {
            query.title = {
                $regex: req.query.search,
                $options: 'i'
            };

            products = await Product.aggregate([
                {$match: query},
                {$addFields: {rating: {$avg: '$rating.rating'}, ratingCount: {$size: '$rating'}}},
                {$project: { title: 1, description: 1, price: 1, inStock: 1, image: 1, discount: 1, rating: 1, ratingCount: 1 }}
            ]);
        } else {
            products = await Product.aggregate([
                {$addFields: {rating: {$avg: '$rating.rating'}, ratingCount: {$size: '$rating'}}},
                {$project: { title: 1, description: 1, price: 1, inStock: 1, image: 1, discount: 1, rating: 1, ratingCount: 1 }}
            ]);
        }

        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/feedback/:id', async (req, res) => {
    try {
        const rating = await Product.findById(req.params.id).select('rating').populate('rating.user', 'email');

        res.send(rating);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product
            .aggregate([
                {$match: {_id: mongoose.Types.ObjectId(req.params.id)}},
                {$addFields: {rating: {$avg: '$rating.rating'}, ratingCount: {$size: '$rating'}}},
            ]);

        if (!product[0]) res.status(404).send('Product not found!');
        res.send(product[0]);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});

router.post('/feedback/:id', auth, async (req, res) => {
    try {
        const {rating, text} = req.body;

        const feedbackData = {
            rating,
            user: req.user._id,
            text: text ? text : null,
        };

        if (req.params.id) {
            await Product.findByIdAndUpdate(req.params.id, { $push: { rating: feedbackData } });
        }

        res.send('Success');
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;