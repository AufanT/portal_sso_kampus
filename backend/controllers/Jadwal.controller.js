const db = require('../models');
const { User, Role, Enrollment, Class, Course, Attendance } = db;

exports.getJadwalUser = async (req, res) => {
    try {
        const user = req.user; 

        let jadwal;
        if (user.Role.name === 'mahasiswa') {
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
    const { class_id, meeting_date, status } = req.body;
    const student_id = req.userId;

    try {
        const enrollment = await Enrollment.findOne({
            where: {
                student_id: student_id,
                class_id: class_id
            }
        });

        if (!enrollment) {
            return res.status(403).send({
                message: "Akses ditolak. Anda tidak terdaftar di kelas ini."
            });
        }

        const kelas = await Class.findByPk(class_id, {
            attributes: ['lecturer_id'] 
        });

        if (!kelas) {
            return res.status(404).send({ 
                message: "Kelas tidak ditemukan." 
            });
        }
        
        const responsibleLecturerId = kelas.lecturer_id;

        const presensi = await Attendance.create({
            class_id,
            student_id,
            meeting_date,
            status,
            created_by: responsibleLecturerId 
        });

        res.status(201).send({ 
            message: "Presensi berhasil dicatat.", 
            data: presensi 
        });

    } catch (error) {
        res.status(500).send({ 
            message: "Terjadi kesalahan saat mencatat presensi." 
        });
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