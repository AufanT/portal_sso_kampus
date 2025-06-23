'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TuitionBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Sebuah tagihan milik satu Mahasiswa (User)
      TuitionBill.belongsTo(models.User, {
        foreignKey: 'student_id'
      });
    }
  }
  TuitionBill.init({
    student_id: DataTypes.INTEGER,
    billing_period: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    due_date: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM('Lunas', 'Belum Lunas'),
      defaultValue: 'Belum Lunas'
    },
    payment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TuitionBill',
  });
  return TuitionBill;
};