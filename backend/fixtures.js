const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Product = require("./models/Product");
const Category = require("./models/Category");
const SubCategory = require("./models/SubCategory");

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        username: 'admin',
        displayName: 'Айбек',
        password: 'admin',
        email: 'aibek@gmail.com',
        token: nanoid(),
        role: 'admin',
    }, {
        username: 'user',
        displayName: 'Вова',
        password: 'user',
        email: 'vova@gmail.com',
        token: nanoid(),
        role: 'user',
    });

    const [c1, c2, c3] = await Category.create({
        title: "Свет",
    }, {
        title: "Электрика",
    }, {
        title: "Бытовая техника",
    });

    await SubCategory.create({
        title: "Лампочки",
        parentCategory: c1._id,
    }, {
        title: "Розетки",
        parentCategory: c2._id,
    }, {
        title: "Провода",
        parentCategory: c3._id,
    }, {
        title: "Пылесосы",
        parentCategory: c1._id,
    });



    await Product.create({
        category: c1._id,
        title: "Legrand Etika Белый Розетка комп (RJ45) одинарная 5 категория UTP",
        description: "Ищете Телефонные розетки недорого? Обратите внимание на товар «Legrand Etika Белый Розетка комп (RJ45) одинарная 5 категория UTP Розетки оснащены винтовыми и безвинтовыми зажимами для безопасного и быстрого монтажа. Доступны механизмы, оборудованные защитными шторками. Для выключателей с дизайном Allure предусмотрена контурная подсветка клавиши.",
        code: "34456",
        price: 293,
        amount: 13,
        image: ["fixtures/LegrandEtika1.png", "fixtures/LegrandEtika2.png", "fixtures/LegrandEtika3.png"],

        isHit: true,
    }, {
        category: c2._id,
        title: "Legrand Valena Крем Розетка 1-ая с/з",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit alias corporis aperiam quaerat debitis doloribus dolore ipsum atque porro ex animi, rem aut assumenda maiores. Ut officia sunt autem asperiores obcaecati accusantium, nisi, consectetur placeat distinctio nihil ex consequatur voluptatibus eum porro harum corrupti natus consequuntur nulla reprehenderit rerum at!",
        code: "98821",
        price: 453,
        amount: 2,
        image: ["fixtures/LegrandValena1.png"],

        isHit: true,
        discount: 15,
    }, {
        category: c3._id,
        title: "Legrand Valena Крем Розетка 1-ая с/з",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, molestias?",
        code: "98191",
        price: 93,
        amount: 0,
        image: ["fixtures/LegrandValena2.png"],

        isNew: true,
    }, {
        category: c3._id,
        title: "Legrand Valena Крем Розетка 1-ая с/з",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, molestias?",
        code: "92345",
        price: 293,
        amount: 11,
        image: ["fixtures/LegrandValena3.png"],
    });

    await mongoose.connection.close();
};

run().catch(console.error);