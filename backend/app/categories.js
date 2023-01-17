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

        if (req.query.toTree) {
            const categories = await Category.find().populate('subCategories', 'title');

            const categoryOptions = categories.map(c => {
                return {
                    _id: c._id, title: c.title, value: c._id,
                     children: c.subCategories?.map(sub => ({_id: sub._id, title: sub.title, value: sub._id}))

                }
            })

            return res.send(categoryOptions);
        }

        if (req.query.toTable) {
            const categories = await Category.find();
            const subCategories = await SubCategory.find().populate('parentCategory', 'title');

            return res.send([...categories, ...subCategories]);
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

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            const subCategory = await SubCategory.findById(req.params.id);

            return res.send(subCategory);
        }

        res.send(category);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res) => {
    try {
        const {title, parentCategory, isPopular} = req.body;

        const categoryData = {
            title,
            isPopular,
        };

        if (parentCategory && parentCategory !== "Без категории") {
            categoryData.parentCategory = parentCategory;

            const newCategory = new SubCategory(categoryData);
            await newCategory.save();

            return res.send(categoryData);
        } else {
            if (req.file) {
                categoryData.image = 'uploads/' + req.file.filename;
            }

            const newCategory = new Category(categoryData);
            await newCategory.save();

            res.send(categoryData);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', auth, permit('admin'), upload.single('image'), async (req, res) => {
    try {
        const {title, parentCategory, isPopular} = req.body;

        const categoryData = {
            title,
            isPopular,
        };

        if (parentCategory && parentCategory !== "Без категории") {
            categoryData.parentCategory = parentCategory;

            const category = await SubCategory.findByIdAndUpdate(req.params.id, categoryData);

            return res.send(category);
        } else {
            if (req.file) {
                categoryData.image = 'uploads/' + req.file.filename;
            }

            const category = await Category.findByIdAndUpdate(req.params.id, categoryData);

            res.send(category);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;