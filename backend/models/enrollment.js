'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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