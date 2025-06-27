'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookBorrow extends Model {
    static associate(models) {
      // Sebuah peminjaman merujuk pada satu Buku
      BookBorrow.belongsTo(models.Book, {
        foreignKey: 'book_id'
      });
    
      // Sebuah peminjaman dilakukan oleh satu User
      BookBorrow.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  BookBorrow.init({
    book_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    borrow_date: DataTypes.DATEONLY,
    due_date: DataTypes.DATEONLY,
    return_date: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM('Dipinjam', 'Kembali', 'Terlambat'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BookBorrow',
  });
  return BookBorrow;
};