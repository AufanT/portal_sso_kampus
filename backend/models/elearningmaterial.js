'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ElearningMaterial extends Model {
    static associate(models) {
      ElearningMaterial.belongsTo(models.Class, {
        foreignKey: 'class_id'
      });
    }
  }
  ElearningMaterial.init({
    class_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    file_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ElearningMaterial',
  });
  return ElearningMaterial;
};