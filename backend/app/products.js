const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const path = require('path');
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/sales', async (req, res) => {
    try {
        const products = await Product.aggregate([
            {$match: {discount: {$gt: 0}}},
            {
                $addFields: {
                    rating: {$avg: '$rating.rating'},
                    ratingCount: {$size: '$rating'},
                },
            },
        ]);
        await Product.populate(products, {path: "category subCategory"});
        return  res.send({ products, totalPages: 0 });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const {page, limit} = req.query;
        const query = {};

        if (req.query.search) {
            query.title = {
                $regex: req.query.search,
                $options: 'i',
            };
        }

        if (req.query.category) {
            if (req.query.parent) {
                query.subCategory = mongoose.Types.ObjectId(req.query.category);
            } else {
                query.category = mongoose.Types.ObjectId(req.query.category);
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalDocuments = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalDocuments / limit);
        let products;

        if (page && limit) {
            products = await Product.aggregate([
                {$match: query},
                {
                    $addFields: {
                        rating: {$avg: '$rating.rating'},
                        ratingCount: {$size: '$rating'},
                    },
                },
                {$skip: skip},
                {$limit: parseInt(limit)},
            ]);
            await Product.populate(products, {path: "category subCategory"});
            return  res.send({ products, totalPages });
        } else {
            products = await Product.aggregate([
                {$match: query},
                {
                    $addFields: {
                        rating: {$avg: '$rating.rating'},
                        ratingCount: {$size: '$rating'},
                    },
                },
            ]);
            await Product.populate(products, {path: "category subCategory"});

            return  res.send({products, totalPages: 0});

        }




    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/feedback/:id', async (req, res) => {
    try {
        const rating = await Product.findById(req.params.id)
            .select('rating')
            .populate('rating.user', 'email');

        res.send(rating);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.aggregate([
            {$match: {_id: mongoose.Types.ObjectId(req.params.id)}},
            {
                $addFields: {
                    rating: {$avg: '$rating.rating'},
                    ratingCount: {$size: '$rating'},
                },
            },
        ]);

        if (!product[0]) res.status(404).send('Product not found!');
        res.send(product[0]);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/admin/:id', async (req, res) => {
    try {
        const product = await Product
            .findById({_id: req.params.id})
            .select("_id category subCategory title description code price amount image isHit isNovelty discount")

        if (product.subCategory) {
            product.category = product.subCategory;
        }

        product.subCategory = null;


        if (!product) res.status(404).send('Product not found!');
        res.send(product);
    } catch (e) {
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


router.post('/', auth, permit('admin'), upload.array('image', 5), async (req, res) => {
        try {
            const {category, title, description, code, price, amount, isHit, isNovelty, discount} = req.body;

            const productData = {
                category: '',
                subCategory: '',
                title,
                description: description || null,
                code,
                price,
                amount,
                isHit,
                isNovelty,
                discount,
                image: null,
            };

            const isLeafCategory = await Category.findById(category);

            if (isLeafCategory) {
                productData.category = isLeafCategory._id;
            } else {
                const subCategory = await SubCategory.findById(category);

                if (subCategory) {
                    productData.category = subCategory.parentCategory;
                    productData.subCategory = subCategory._id;
                }
            }

            if (req.files) {
                productData.image = req.files.map(
                    (i) => 'uploads/' + i.filename
                );
            }

            const newProduct = new Product(productData);
            await newProduct.save();

            res.send(newProduct);
        } catch (e) {
            console.log(e)
            res.status(400).send(e);
        }
    }
);

router.put('/:id', auth, permit('admin'), upload.array('image', 5), async (req, res) => {
        try {
            const {category, title, description, code, price, amount, isHit, isNovelty, discount} = req.body;

            const productData = {
                category: '',
                subCategory: '',
                title,
                description: description || null,
                code,
                price,
                amount,
                isHit,
                isNovelty,
                discount,
                image: null,
            };

            const isLeafCategory = await Category.findById(category);

            if (isLeafCategory) {
                productData.category = isLeafCategory._id;
            } else {
                const subCategory = await SubCategory.findById(category);

                if (subCategory) {
                    productData.category = subCategory.parentCategory;
                    productData.subCategory = subCategory._id;
                }
            }

            if (req.files) {
                productData.image = req.files.map(
                    (i) => 'uploads/' + i.filename
                );
            }

            const updateProduct = await Product.findByIdAndUpdate(req.params.id, productData);
            res.send(updateProduct);
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({message: 'Product not found!'});
        }

        await Product.deleteOne(product);
        res.send({message: "Продукт успешно удален!"});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
