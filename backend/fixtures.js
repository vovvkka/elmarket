const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Product = require("./models/Product");
const Category = require("./models/Category");
const SubCategory = require("./models/SubCategory");
const Contacts = require("./models/Contacts");
const Visit = require("./models/Visit");

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        username: 'admin',
        displayName: 'Админ',
        password: 'hf3eGYZNg',
        email: 'altynbek.electro@gmail.com',
        token: nanoid(),
        isActivated: true,
        activationLink: "jfsdkasd",
        role: 'admin',
    });

    await Contacts.create({
        phone: ['+(996) 777-77-11-07', '+(996)709-40-39-55'],
        email: ['electromarket.kg@gmail.com'],
        instagramLink: 'https://www.instagram.com/electromarket.kg/'
    });

    await Visit.create({
        visits: 0
    });

    await mongoose.connection.close();
};

run().catch(console.error);