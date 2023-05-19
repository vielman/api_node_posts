const Sequelize = require('sequelize');
const sequelize = require('../utils/connectiondb');

class Users extends Sequelize.Model {}
Users.init({
  user_id: {
      type: Sequelize.SMALLINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
 
}, {
  sequelize,
  modelName: 'users',
  freezeTableName: true,
  underscored: true
});

module.exports = Users;

async function tetsConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


