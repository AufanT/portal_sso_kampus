'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE role_id = (SELECT id FROM Roles WHERE name = 'mahasiswa' LIMIT 1)`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length > 0) {
      const billsToInsert = [];

      users.forEach(user => {
        billsToInsert.push({
          student_id: user.id,
          billing_period: 'Ganjil 2024/2025',
          amount: 5500000.00,
          due_date: '2024-08-30',
          status: 'Belum Lunas',
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        billsToInsert.push({
          student_id: user.id,
          billing_period: 'Genap 2023/2024',
          amount: 5000000.00,
          due_date: '2024-02-28',
          status: 'Lunas',
          payment_date: '2024-02-15',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });

    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TuitionBills', null, {});
  }
};