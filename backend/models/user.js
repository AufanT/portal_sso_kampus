'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'role_id'
      });

      User.hasMany(models.Class, { as: 'TaughtClasses', foreignKey: 'lecturer_id' });
      User.hasMany(models.Enrollment, { as: 'Enrollments', foreignKey: 'student_id' });
      User.hasMany(models.Attendance, { as: 'Attendances', foreignKey: 'student_id' });
      User.hasMany(models.Attendance, { as: 'CreatedAttendances', foreignKey: 'created_by' });
      User.hasMany(models.BookBorrow, { foreignKey: 'user_id' });
      User.hasMany(models.TuitionBill, { foreignKey: 'student_id' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    full_name: DataTypes.STRING,
    identity_number: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};