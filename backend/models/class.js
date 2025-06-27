'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      // Sebuah Kelas milik satu Mata Kuliah (Course)
      Class.belongsTo(models.Course, {
        foreignKey: 'course_id'
      });
    
      // Sebuah Kelas diajar oleh satu Dosen (User)
      // Kita pakai 'as' (alias) untuk memperjelas peran User di sini
      Class.belongsTo(models.User, {
        as: 'Lecturer',
        foreignKey: 'lecturer_id'
      });
    
      // Sebuah Kelas memiliki banyak data pendaftaran (Enrollment)
      Class.hasMany(models.Enrollment, {
        foreignKey: 'class_id'
      });
    
      // Sebuah Kelas memiliki banyak data presensi (Attendance)
      Class.hasMany(models.Attendance, {
        foreignKey: 'class_id'
      });
    
      // Sebuah Kelas memiliki banyak materi e-learning
      Class.hasMany(models.ElearningMaterial, {
        foreignKey: 'class_id'
      });
    }
  }
  Class.init({
    course_id: DataTypes.INTEGER,
    lecturer_id: DataTypes.INTEGER,
    academic_year: DataTypes.STRING,
    semester: { 
      type: DataTypes.ENUM('Ganjil', 'Genap'),
      allowNull: false 
    },
    day: DataTypes.STRING,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};