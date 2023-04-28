const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const permit = require('../middlewares/permit');
const auth = require('../middlewares/auth');
const path = require('path');
const multer = require('multer');
const { nanoid } = require('nanoid');
const config = require('../config');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        if (req.query.toOptions) {
            const categoriesArr = await Category.find();

            const categories = categoriesArr.map((c) => {
                return { _id: c._id, label: c.title, value: c._id };
            });

            return res.send({categories});
        }

        if (req.query.toTree) {
            const categoriesArr = await Category.find().populate(
                'subCategories',
                'title'
            );

            const categories = categoriesArr.map((c) => {
                return {
                    _id: c._id,
                    title: c.title,
                    value: c._id,
                    children: c.subCategories?.map((sub) => ({
                        _id: sub._id,
                        title: sub.title,
                        value: sub._id,
                    })),
                };
            });

            return res.send({categories});
        }

        if (req.query.toTable) {
            let { search, page, limit } = req.query;
            let query = {};

            if (!page) page = 1;
            if (!limit) limit = 4;

            if (search) {
                query =  { title: { $regex: `${search}`, $options: 'i' } };
            }

            const categoriesArr = await Category.find(query);
            const subCategories = await SubCategory.find(query).populate(
                'parentCategory',
                'title'
            );
           const categories = [...categoriesArr, ...subCategories];

            if (page && limit) {
                const skip = (parseInt(page) - 1) * parseInt(limit);
                const totalCategories = await Category.countDocuments(query);
                const totalSub = await SubCategory.countDocuments(query);
                const totalPages = Math.ceil(
                    (totalCategories + totalSub) / limit
                );

                const paginatedData = categories.slice(skip, skip + parseInt(limit));
                return res.send({categories: paginatedData, totalPages});
            } else {
                return res.send({categories});
            }
        }

        const categories = await Category.find().populate(
            'subCategories',
            'title'
        );
        res.send({categories});
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/popular', async (req, res) => {
    try {
        const categories = await Category.find({ isPopular: true }).limit(8);
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

router.post('/', auth, permit('admin'), async (req, res) => {
        try {
            const { title, parentCategory, isPopular } = req.body;

            const categoryData = {
                title,
                isPopular,
            };

            if (parentCategory && parentCategory !== 'Без категории') {
                categoryData.parentCategory = parentCategory;

                const newCategory = new SubCategory(categoryData);
                await newCategory.save();

                return res.send(categoryData);
            } else {
                const newCategory = new Category(categoryData);
                await newCategory.save();

                res.send(categoryData);
            }
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

router.put(
    '/:id',
    auth,
    permit('admin'),
    upload.single('image'),
    async (req, res) => {
        try {
            const { title, parentCategory, isPopular } = req.body;

            const categoryData = {
                title,
                isPopular,
            };

            if (parentCategory && parentCategory !== 'Без категории') {
                categoryData.parentCategory = parentCategory;

                const category = await SubCategory.findByIdAndUpdate(
                    req.params.id,
                    categoryData
                );

                return res.send(category);
            } else {
                if (req.file) {
                    categoryData.image = 'uploads/' + req.file.filename;
                }

                const category = await Category.findByIdAndUpdate(
                    req.params.id,
                    categoryData
                );

                res.send(category);
            }
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        await Product.deleteMany({ category: req.params.id });
        await Product.deleteMany({ subCategory: req.params.id });

        const category = await Category.findById(req.params.id);

        if (category) {
            await Category.deleteOne({ _id: req.params.id });
            return res.send({ message: 'Категория успешно удалена!' });
        }

        const subCategory = await SubCategory.findById(req.params.id);

        await subCategory.deleteOne(subCategory);
        res.send({ message: 'Подкатегория успешно удалена!' });
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
