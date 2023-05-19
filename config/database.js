require('dotenv').config();

module.exports = {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "data_posts",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.DB_PORT || 3306,

    seederStorage: 'sequelize',
    seederStorageTableName: "SequelizsSeeds",
    
    definie:{
      underscored: true
    }
}
