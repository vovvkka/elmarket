const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');

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

    await mongoose.connection.close();
};

run().catch(console.error);