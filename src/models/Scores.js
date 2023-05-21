'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Posts,{as: "Posts", foreignKey: "post_id"});
    }
  }
  Scores.init({
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Scores',
  });
  return Scores;
};