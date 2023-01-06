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

    const [c1, c2, c3, c4, c5, c6, c7, c8, c9] = await Category.create({
        title: "Кабель, провод",
        isPopular: true,
    }, {
        title: "Светодиодные светильники LED, Лампы",
        isPopular: true,
    }, {
        title: "Силовые разъемы, вилки, колодки электрические",
    }, {
        title: "НВО (Автоматические выключатели УЗО, Щиты, Боксы, Электросчетчики",
        isPopular: true,
    }, {
        title: "Электромонтажные изделия, кабельные системы, клеммы",
        isPopular: true,
    }, {
        title: "Обогрев труб и кровли, терморегуляторы",
        isPopular: true,
    }, {
        title: "Розетки и выключатели",
        isPopular: true,
    } , {
        title: "Инстуремнты и прочее",
        isPopular: true,
    }, {
        title: "Кабельные лотки, металлические крепежи",
    }, );

    const [s1, s2, s3, s4] =  await SubCategory.create({
        title: "Розетки",
        parentCategory: c7._id,
    }, {
        title: "Выключатели",
        parentCategory: c7._id,
    }, {
        title: "Переходники",
        parentCategory: c7._id,
    }, {
        title: "Крепежи",
        parentCategory: c9._id,
    });



    await Product.create({
        category: c7._id,
        subCategory: s1._id,
        title: "Legrand Etika Белый Розетка комп (RJ45) одинарная 5 категория UTP",
        description: "Ищете Телефонные розетки недорого? Обратите внимание на товар «Legrand Etika Белый Розетка комп (RJ45) одинарная 5 категория UTP Розетки оснащены винтовыми и безвинтовыми зажимами для безопасного и быстрого монтажа. Доступны механизмы, оборудованные защитными шторками. Для выключателей с дизайном Allure предусмотрена контурная подсветка клавиши.",
        code: "34456",
        price: 293,
        amount: 13,
        image: ["fixtures/LegrandEtika1.png", "fixtures/LegrandEtika2.png", "fixtures/LegrandEtika3.png"],

        isHit: true,
    }, {
        category: c7._id,
        subCategory: s1._id,
        title: "Legrand Valena Крем Розетка 1-ая с/з",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit alias corporis aperiam quaerat debitis doloribus dolore ipsum atque porro ex animi, rem aut assumenda maiores. Ut officia sunt autem asperiores obcaecati accusantium, nisi, consectetur placeat distinctio nihil ex consequatur voluptatibus eum porro harum corrupti natus consequuntur nulla reprehenderit rerum at!",
        code: "98821",
        price: 453,
        amount: 2,
        image: ["fixtures/LegrandValena1.png"],

        isHit: true,
        discount: 15,
    }, {
        category: c7._id,
        subCategory: s2._id,
        title: "Legrand Valena Крем Розетка 1-ая с/з",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, molestias?",
        code: "98191",
        price: 93,
        amount: 0,
        image: ["fixtures/LegrandValena2.png"],

        isNovelty: true,
    }, {
        category: c9._id,
        subCategory: s4._id,
        title: "Legrand Valena Крем Розетка 1-ая с/з",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, molestias?",
        code: "92345",
        price: 293,
        amount: 11,
        image: ["fixtures/LegrandValena3.png"],
    }, {
        category: c8._id,
        title: "Legrand Valena Крем Розетка 1-ая с/з",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, molestias? want to purchase? Make a order, add this product in cart.",
        code: "92349",
        price: 190,
        amount: 8,
        image: ["fixtures/LegrandValena3.png"],
    });

    await mongoose.connection.close();
};

run().catch(console.error);