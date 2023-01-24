const path = require('path');

const dbHost = process.env.DB_HOST || 'localhost';
let dbUrl = 'mongodb://' + dbHost + '/electromarket'

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: dbUrl,
        options: {useNewUrlParser: true},
    },
};