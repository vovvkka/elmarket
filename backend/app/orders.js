const express = require('express');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const Order = require('../models/Order');
const Product = require('../models/Product');
const transporter = require("../service/transporter");
const router = express.Router();

router.get('/user-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate('order.product')
            .limit(10)
            .sort({ dateTime: 1 });
        res.send(orders);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        await Order.populate(order, { path: 'order.product' });
        res.send(order);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/', auth, permit('admin'), async (req, res) => {
    try {
        let { page, limit } = req.query;
        const query = {};

        if (!page) page = 1;
        if (!limit) limit = 4;

        if (req.query.status === 'active') {
            query.status = { $ne: 'Закрыт' };
        } else if (req.query.status === 'closed') {
            query.status = 'Закрыт';
        }

        const orders = await Order.aggregate([
            { $match: query },
            { $sort: { dateTime: -1 } },
            { $skip: (parseInt(page) - 1) * parseInt(limit) },
            { $limit: parseInt(limit) },
        ]);

        const totalItems = await Order.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);
        await Order.populate(orders, { path: 'order.product' });

        res.send({ orders, totalPages, totalItems });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const { userId, customer, phone, order, address, payment } = req.body;

        order.map(async i => {
            const product = await Product.findById(i.product);
            product.amount -= i.quantity;
            await product.save();
        });

        const orderWithPrice = await Promise.all(
            order.map(async (i) => {
                const item = await Product.findById(i.product);
                let price = item.price;
                if (item.discount && userId)
                    price = Math.floor(
                        item.price - (item.price / 100) * item.discount
                    );
                return { ...i, price, discount: item.discount, initialPrice: item.price };
            })
        );

        const orderData = {
            userId,
            customer,
            phone,
            address,
            payment,
            order: orderWithPrice,
            dateTime: new Date().toLocaleString(),
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        transporter.sendNotificationOfNewOrder(newOrder._id);

        await res.send(newOrder);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id/changeStatus', auth, permit('admin'), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order)
            return res.status(404).send({ message: 'Заказ не найден!' });

        order.status = 'Закрыт';
        await order.save({ validateBeforeSave: false });

        res.send(order);
    } catch (e) {
        res.status(400).send({ error: e.errors });
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).send({ message: 'Заказ не найден!' });
        }

        await Order.deleteOne(order);
        res.send({ message: 'Заказ успешно удален!' });
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
