const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateUsernameLength = username => {
    return username.length < 50;
};

const validatePhoneNumber = phoneNumber => {
    const phoneNumberRegex = /^\+\d{3}\(\d{3}\)[\d-]{7,}$/;

    return phoneNumber.match(phoneNumberRegex);
};


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

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    customer: {
        type: String,
        required: true,
        validate: {
            validator: validateUsernameLength,
            message: "Максимальная длина символов - 50"
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: validatePhoneNumber,
            message: "Неккоректный номер телефона"
        }
    },
    payment: {
        type: String,
        required: true,
        default: "Optima",
    },
    address: String,
    order: [ProductsSchema],
    status: {
        type: String,
        required: true,
        default: 'Новый',
        enum: ['Новый', 'Закрыт'],
    },
    dateTime: {
        type: String,
        required: true,
        default: new Date().toISOString(),
    }
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;