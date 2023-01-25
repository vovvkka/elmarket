const express = require("express");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Order = require("../models/Order");
const Product = require("../models/Product");
const router = express.Router();

router.get("/user-orders", auth, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.user._id}).populate("order.product").limit(10).sort({dateTime: 1});
        res.send(orders);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/", auth, permit("admin"), async (req, res) => {
    try {
        const query = {};

        if (req.query.status === "active") {
            query.status = { $ne: "Закрыт" };
        } else if (req.query.status === "closed") {
            query.status = "Закрыт";
        }

        const orders = await Order.find(query).populate("order.product");

        res.send(orders);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post("/", async (req, res) => {
    try {
        const {userId, customer, phone, order} = req.body;
        console.log(order);

        if (!customer || !phone || !order) {
            return res.status(400).send({error: "Data not valid"});
        }

        const orderWithPrice = await Promise.all(order.map(async i => {
            const item = await Product.findById(i.product);

            return {...i, price: item.price};
        }));

        const orderData = {
            userId,
            customer,
            phone,
            order: orderWithPrice,
        };


        const newOrder = new Order(orderData);
        await newOrder.save();

        await res.send(order);
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.put("/:id/changeStatus", auth, permit("admin"), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).send({ message: "Заказ не найден!" });

        order.status = "Закрыт";
        await order.save();

        res.send(order);
    } catch (e) {
        res.status(400).send({ error: e.errors });
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).send({message: 'Order not found!'});
        }

        await Order.deleteOne(order);
        res.send({message: "Заказ успешно удален!"});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
