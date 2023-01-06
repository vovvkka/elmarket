const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean,
        required: true,
        default: false,
    },
    image: String,
});

CategorySchema.virtual('subCategories', {
    ref: 'SubCategory',
    localField: '_id',
    foreignField: 'parentCategory'
});

CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
