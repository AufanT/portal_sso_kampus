'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.Class, {
        foreignKey: 'course_id'
      });
    }
  }
  Course.init({
    course_code: DataTypes.STRING,
    name: DataTypes.STRING,
    credits: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};