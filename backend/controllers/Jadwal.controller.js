const db = require('../models');
const { User, Role, Enrollment, Class, Course, Attendance } = db;

exports.getJadwalUser = async (req, res) => {
    try {
        // HAPUS query User.findByPk, dan langsung ambil data user dari 'req'
        const user = req.user; 

        let jadwal;
        if (user.Role.name === 'mahasiswa') {
            // ... sisa logikanya tetap sama
            jadwal = await Enrollment.findAll({
                where: { student_id: req.userId },
                attributes: [],
                include: [{
                    model: Class, as: 'Class',
                    include: [{ model: Course, as: 'Course' }, { model: User, as: 'Lecturer', attributes: ['full_name'] }]
                }]
            });
            jadwal = jadwal.map(e => e.Class);
        } else if (user.Role.name === 'dosen') {
            // ... sisa logikanya tetap sama
            jadwal = await Class.findAll({
                where: { lecturer_id: req.userId },
                include: [{ model: Course, as: 'Course' }]
            });
        } else {
            return res.status(403).send({ message: 'Role tidak valid untuk melihat jadwal.' });
        }
        res.status(200).send(jadwal);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.lakukanPresensi = async (req, res) => {
    // Body: { class_id: 1, meeting_date: "2025-06-26", status: "Hadir" }
    const { class_id, meeting_date, status } = req.body;

    try {
        // Dosen (creator) perlu di-handle secara terpisah, diasumsikan admin yg membuat sesi
        const presensi = await Attendance.create({
            class_id,
            student_id: req.userId,
            meeting_date,
            status,
            created_by: req.userId // Untuk simple, user sendiri yg create
        });
        res.status(201).send(presensi);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.lihatPresensi = async (req, res) => {
    const { classId } = req.params;
    try {
        const rekap = await Attendance.findAll({
            where: { class_id: classId },
            include: [{
                model: User,
                as: 'Student',
                attributes: ['id', 'full_name', 'identity_number']
            }],
            order: [['meeting_date', 'DESC']]
        });
        res.status(200).send(rekap);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};