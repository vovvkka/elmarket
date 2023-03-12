const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    text: String,
}, {
    timestamps: true,
});

const ProductSchema = new Schema({
    category: {
        ref: 'Category',
        type: Schema.Types.ObjectId,
        required: true,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    code: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async value => {
                const product = await Product.findOne({barcode: value});
                if (product) return false;
            },
            message: 'Продукт с таким баркодом уже существует.',
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    image: [{type: String}],
    isHit: {
        type: Boolean,
        required: true,
        default: false
    },
    isNovelty: {
        type: Boolean,
        required: true,
        default: false
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    amountForDiscount: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
    unit: {
        type: String,
        required: true,
        enum: ['шт.', 'уп.', 'килограмм', 'метр']
    },
    rating: [RatingSchema],
}, {
    timestamps: true,
});

ProductSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
