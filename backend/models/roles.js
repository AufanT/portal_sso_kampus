'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // Gunakan nama singular: 'Role'
  class Role extends Model {
    static associate(models) {
      // Definisikan relasi: sebuah Role memiliki banyak User
      Role.hasMany(models.User, {
        foreignKey: 'role_id'
      });
    }
  }
  
  // Inisialisasi model dengan SEMUA kolomnya
  Role.init({
    // DEFINISIKAN primary key 'id' DI SINI
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // DEFINISIKAN 'name' dengan lengkap
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Role', // Gunakan nama singular
    tableName: 'Roles', // Eksplisit beritahu nama tabelnya
    timestamps: false // Kita nonaktifkan createdAt & updatedAt untuk tabel ini
  });
  return Role;
};