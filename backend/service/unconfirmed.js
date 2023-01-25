const User = require('../models/User');
const cron = require('node-cron');

const deleteUnconfirmedUsers = async () => {
    const threeHoursAgo = new Date(Date.now() - (12 * 60 * 60 * 1000));
    const unconfirmedUsers = await User.deleteMany({
        isActivated: false,
        createdAt: { $lt: threeHoursAgo }
    });

    console.log(`Deleted ${unconfirmedUsers.deletedCount} unconfirmed users.`);
};

cron.schedule('*/10 * * * *', deleteUnconfirmedUsers);

module.exports = deleteUnconfirmedUsers;
