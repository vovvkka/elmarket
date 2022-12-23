const express = require('express');
const router = express.Router();
const Product = require("../models/Product");

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}, 'title price inStock image discount');
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id});
        res.send(product);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;