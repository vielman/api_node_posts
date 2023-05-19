const Sequelize = require('sequelize');

const sequelize = new Sequelize('data_posts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;