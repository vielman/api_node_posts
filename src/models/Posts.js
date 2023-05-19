'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Audits,{as: "Audits", foreignKey: "user_id"});
      this.hasMany(models.Scores,{as: "Scores", foreignKey: "post_id"});
    }
  }
  Posts.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};