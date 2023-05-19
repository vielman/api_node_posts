const {Sequelize, DataTypes} = require('sequelize');
const config = require('../../config/database');
const db = {};

db.connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port
});

// models
db.Users = require('../models/Users')(db.connection, DataTypes);
db.Roles = require('../models/Roles')(db.connection, DataTypes);
db.Posts = require('../models/Posts')(db.connection, DataTypes);
db.Audits = require('../models/Audits')(db.connection, DataTypes);
db.Scores = require('../models/Scores')(db.connection, DataTypes);

// association
db.Users.associate(db);
db.Roles.associate(db);
db.Posts.associate(db);
db.Audits.associate(db);
db.Scores.associate(db);

module.exports = db;