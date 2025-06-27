'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      Enrollment.belongsTo(models.User, {
        as: 'Student',
        foreignKey: 'student_id'
      });

      // Sebuah Enrollment merujuk ke satu Kelas
      Enrollment.belongsTo(models.Class, {
       foreignKey: 'class_id'
      });
    }
  }
  Enrollment.init({
    student_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER,
    grade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};