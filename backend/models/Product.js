const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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
                const category = await Product.findOne({barcode: value});

                if (category) return false;
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
    inStock: {
        type: Boolean,
        required: true,
    },
    image: [{type: String}],

    isHit: Boolean,
    isNew: Boolean,
    discount: Number,
});

ProductSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
