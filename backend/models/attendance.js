'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.Class, {
        foreignKey: 'class_id'
      });
        
      // Sebuah data presensi milik satu Mahasiswa (User)
      Attendance.belongsTo(models.User, {
        as: 'Student',
        foreignKey: 'student_id'
      });
    
      // Sebuah data presensi dibuat oleh satu Dosen (User)
      Attendance.belongsTo(models.User, {
        as: 'Creator',
        foreignKey: 'created_by'
      });
    }
  }
  Attendance.init({
    class_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    meeting_date: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM('Hadir', 'Sakit', 'Izin', 'Alpa'),
      allowNull: false
    },
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};