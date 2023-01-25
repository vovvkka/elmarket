const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ProductsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
});

const OrderSchema  = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    customer: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address:  String,
    order: [ProductsSchema],
    status: {
        type: String,
        required: true,
        default: 'Новый',
        enum: ['Новый', 'Закрыт'],
    },
    dateTime: {
        type: Date,
        required: true,
        default: new Date(),
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;