require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const config = require('./config');

const users = require('./app/users');
const products = require('./app/products');
const categories = require('./app/categories');
const orders = require('./app/orders');
const contacts = require('./app/contacts');

const app = express();
const port = 8000;

mongoose.set('strictQuery', false);
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/products', products);
app.use('/categories', categories);
app.use('/orders', orders);
app.use('/contacts', contacts);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('MongoDb disconnect');
    });
};

run().catch(e => console.log(e));