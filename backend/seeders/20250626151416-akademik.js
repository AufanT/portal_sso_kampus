'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Buat beberapa mata kuliah (Courses)
    await queryInterface.bulkInsert('Courses', [
      { course_code: 'IF101', name: 'Dasar Pemrograman', credits: 4 },
      { course_code: 'IF102', name: 'Struktur Data', credits: 3 },
      { course_code: 'UM101', name: 'Bahasa Indonesia', credits: 2 }
    ], {});

    // Ambil semua course yang baru dibuat untuk mendapatkan ID mereka
    const courses = await queryInterface.sequelize.query(
      `SELECT id, course_code FROM Courses;`, { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const courseMap = {};
    courses.forEach(course => { courseMap[course.course_code] = course.id });

    const dosens = await queryInterface.sequelize.query(
      `SELECT Users.id FROM Users JOIN Roles ON Users.role_id = Roles.id WHERE Roles.name = 'dosen'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const dosenIds = dosens.map(d => d.id);
    if (dosenIds.length < 3) {
      throw new Error("Butuh minimal 3 data dosen di database untuk menjalankan seeder ini.");
    }

    // 2. Buat beberapa kelas (Classes) menggunakan ID dari course di atas
    await queryInterface.bulkInsert('Classes', [
      {
        course_id: courseMap['IF101'],
        lecturer_id: dosenIds[0],
        academic_year: '2024/2025',
        semester: 'Ganjil',
        day: 'Senin',
        start_time: '08:00',
        end_time: '10:00'
      },
      {
        course_id: courseMap['IF102'],
        lecturer_id: dosenIds[1],
        academic_year: '2024/2025',
        semester: 'Ganjil',
        day: 'Rabu',
        start_time: '13:00',
        end_time: '15:00'
      },
      {
        course_id: courseMap['UM101'],
        lecturer_id: dosenIds[2],
        academic_year: '2024/2025',
        semester: 'Ganjil',
        day: 'Jumat',
        start_time: '09:00',
        end_time: '11:00'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {});
    await queryInterface.bulkDelete('Courses', null, {});
  }
};