'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const findRoleIdByName = async (roleName) => {
      const result = await queryInterface.sequelize.query(
        `SELECT id FROM Roles WHERE name = :name LIMIT 1`,
        { replacements: { name: roleName }, type: queryInterface.sequelize.QueryTypes.SELECT }
      );
      if (!result.length) {
        throw new Error(`Role "${roleName}" tidak ditemukan. Pastikan seeder Roles sudah berjalan.`);
      }
      return result[0].id;
    };

    const adminRoleId = await findRoleIdByName('admin');
    const dosenRoleId = await findRoleIdByName('dosen');
    const mahasiswaRoleId = await findRoleIdByName('mahasiswa');
    
    const hashedPasswordAdmin = bcrypt.hashSync('passwordadmin', 10);
    const hashedPasswordDosen = bcrypt.hashSync('passworddosen', 10);
    const hashedPasswordMahasiswa = bcrypt.hashSync('passwordmahasiswa', 10);
    
    await queryInterface.bulkInsert('Users', [
      {
        full_name: 'Admin Utama', 
        email: 'admin@kampus.ac.id', 
        password_hash: hashedPasswordAdmin,
        identity_number: 'ADMIN001', 
        role_id: adminRoleId, 
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        full_name: 'Budi Santoso, M.Kom.', 
        email: 'budi.dosen@kampus.ac.id', 
        password_hash: hashedPasswordDosen,
        identity_number: 'D001', 
        role_id: dosenRoleId, 
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        full_name: 'Dr. Indah Permata',
        email: 'indah.dosen@kampus.ac.id',
        password_hash: bcrypt.hashSync('passworddosen2', 10),
        identity_number: 'D002',
        role_id: dosenRoleId,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        full_name: 'Prof. Agus Wijaya',
        email: 'agus.dosen@kampus.ac.id',
        password_hash: bcrypt.hashSync('passworddosen3', 10),
        identity_number: 'D003',
        role_id: dosenRoleId,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        full_name: 'Citra Lestari', 
        email: 'citra.mahasiswa@kampus.ac.id', 
        password_hash: hashedPasswordMahasiswa,
        identity_number: 'M001', 
        role_id: mahasiswaRoleId, 
        createdAt: new Date(), 
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};