const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    title: {
        type: String,
        required: true
    },
    image: String,
});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = SubCategory;
