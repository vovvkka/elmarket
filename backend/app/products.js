const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const path = require("path");
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

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
                {
                    $project: {
                        title: 1,
                        description: 1,
                        price: 1,
                        inStock: 1,
                        image: 1,
                        discount: 1,
                        rating: 1,
                        ratingCount: 1
                    }
                }
            ]);
        } else {
            products = await Product.aggregate([
                {$addFields: {rating: {$avg: '$rating.rating'}, ratingCount: {$size: '$rating'}}},
                {
                    $project: {
                        title: 1,
                        description: 1,
                        price: 1,
                        inStock: 1,
                        image: 1,
                        discount: 1,
                        rating: 1,
                        ratingCount: 1
                    }
                }
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
        res.status(500).send(e);
    }
});

router.post('/', auth, permit('admin'), upload.array('image', 5), async (req, res) => {
    try {
        const {category, title, description, code, price, amount, isHit, isNovelty, discount} = req.body;

        const productData = {
            category: "",
            subCategory: "",
            title,
            description: description || null,
            code,
            price,
            amount,
            isHit,
            isNovelty,
            discount,
            image: null
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
            productData.image = req.files.map(i => 'uploads/' + i.filename);
        }

        console.log(productData);

        const newProduct = new Product(productData);
        await newProduct.save();

        res.send(newProduct);

    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;