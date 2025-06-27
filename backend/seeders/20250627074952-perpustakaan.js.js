'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Masukkan data buku-buku ke tabel 'Books'
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Kalkulus Jilid 1',
        author: 'Edwin J. Purcell',
        isbn: '9789790332420',
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Struktur Data & Algoritma dengan C++',
        author: 'Adam Drozdek',
        isbn: '9789791153029',
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Dasar-Dasar Jaringan Komputer',
        author: 'Andrew S. Tanenbaum',
        isbn: '9780132126953',
        stock: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // 2. Ambil ID user mahasiswa dan buku yang baru dibuat untuk membuat data peminjaman
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE role_id = (SELECT id FROM Roles WHERE name = 'mahasiswa' LIMIT 1)`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const books = await queryInterface.sequelize.query(
      `SELECT id FROM Books`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Pastikan data user dan buku ada sebelum membuat data peminjaman
    if (users.length > 0 && books.length > 0) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const randomStudentId = users[randomUserIndex].id;

      const randomBookIndex = Math.floor(Math.random() * books.length);
      const randomBookId = books[randomBookIndex].id;  

      // 3. Masukkan data peminjaman ke tabel 'BookBorrows'
      await queryInterface.bulkInsert('BookBorrows', [
        {
          book_id: randomBookId,
          user_id: randomStudentId,
          borrow_date: new Date(),
          due_date: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 hari dari sekarang
          status: 'Dipinjam',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BookBorrows', null, {});
    await queryInterface.bulkDelete('Books', null, {});
  }
};