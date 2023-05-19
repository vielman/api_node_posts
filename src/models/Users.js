'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize');
const Roles = require('./Roles')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Roles,{as: "Rol", foreignKey: "rol_id"});
      this.hasMany(models.Audits,{as: "Audits", foreignKey: "user_id"});
    }
  }
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};