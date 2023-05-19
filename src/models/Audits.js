'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users,{as: "Users", foreignKey: "user_id"}),
      this.belongsTo(models.Posts,{as: "Posts", foreignKey: "post_id"})
    }
  }
  Audits.init({
    action: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Audits',
  });
  return Audits;
};