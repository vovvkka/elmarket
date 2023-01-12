const express = require('express');
const router = express.Router();
const Category = require("../models/Category");
const permit = require("../middlewares/permit");
const auth = require("../middlewares/auth");
const path = require("path");
const multer = require("multer");
const {nanoid} = require("nanoid");
const config = require("../config");
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

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res) => {
    try {
        const {title, category, isPopular} = req.body;

        const categoryData = {
            title,
            isPopular,
        };

        if (category && category !== "Без категории") {
            categoryData.parentCategory = category;

            const newCategory = new SubCategory(categoryData);
            await newCategory.save();

            return res.send(category);
        } else {
            if (req.file) {
                categoryData.image = 'uploads/' + req.file.filename;
            }

            const newCategory = new Category(categoryData);
            await newCategory.save();

            res.send(category);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;