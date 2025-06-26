const db = require('../models');
const { Op } = require('sequelize');
const { Enrollment, Class, Course, User } = db;

// --- Logika untuk Mahasiswa ---
exports.isiKrs = async (req, res) => {
    const { classIds } = req.body;
    const studentId = req.userId;

    if (!Array.isArray(classIds) || classIds.length === 0) {
        return res.status(400).send({ message: "Data kelas yang dipilih tidak valid." });
    }

    try {
        const dataToInsert = classIds.map(classId => {
            return {
                student_id: studentId,
                class_id: classId,
                grade: null
            };
        });

        const newEnrollments = await Enrollment.bulkCreate(dataToInsert);

        res.status(201).send({
            message: `${newEnrollments.length} kelas berhasil ditambahkan ke KRS Anda.`,
            data: newEnrollments
        });

    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(404).send({ message: "Satu atau lebih ID kelas yang Anda pilih tidak valid atau tidak ditemukan." });
        }
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send({ message: "Anda sudah terdaftar di salah satu kelas yang dipilih." });
        }
        
        console.error("Error saat mengisi KRS:", error);
        res.status(500).send({ message: "Terjadi kesalahan saat menyimpan KRS." });
    }
};

exports.getKrs = async (req, res) => {
    try {
        const krs = await Enrollment.findAll({
            where: { student_id: req.userId },
            include: [{
                model: Class,
                as: 'Class',
                include: [{
                    model: Course,
                    as: 'Course' 
                }, {
                    model: User,
                    as: 'Lecturer',
                    attributes: ['full_name']
                }]
            }]
        });
        res.status(200).send(krs);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getKhs = async (req, res) => {
    const { semester, academic_year } = req.query;
    if (!semester || !academic_year) {
        return res.status(400).send({ message: "Parameter semester dan academic_year dibutuhkan." });
    }

    try {
        const khs = await Enrollment.findAll({
            where: { student_id: req.userId },
            include: [{
                model: Class,
                as: 'Class',
                where: { semester, academic_year },
                include: [{ model: Course, as: 'Course' }]
            }]
        });
        res.status(200).send(khs);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTranskrip = async (req, res) => {
    try {
        const transkrip = await Enrollment.findAll({
            where: {
                student_id: req.userId,
                grade: { [Op.ne]: null }
            },
            include: [{
                model: Class,
                as: 'Class',
                include: [{ model: Course, as: 'Course' }]
            }],
            order: [
                [ {model: Class, as: 'Class'}, 'academic_year', 'ASC' ],
                [ {model: Class, as: 'Class'}, 'semester', 'ASC' ]
            ]
        });
        res.status(200).send(transkrip);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


// --- Logika untuk Dosen ---

exports.getKelasDosen = async (req, res) => {
    try {
        const kelas = await Class.findAll({
            where: { lecturer_id: req.userId },
            include: [{ model: Course, as: 'Course' }],
            order: [['academic_year', 'DESC'], ['semester', 'DESC']]
        });
        res.status(200).send(kelas);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getMahasiswaByKelas = async (req, res) => {
    try {
        const { classId } = req.params;
        const enrollments = await Enrollment.findAll({
            where: { class_id: classId },
            include: [{
                model: User,
                as: 'Student',
                attributes: ['id', 'full_name', 'identity_number']
            }]
        });
        res.status(200).send(enrollments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.inputNilai = async (req, res) => {
    const { enrollment_id, grade } = req.body;

    try {
        const enrollment = await Enrollment.findByPk(enrollment_id, {
            include: [{ model: Class, as: 'Class', attributes: ['lecturer_id'] }]
        });

        if (!enrollment) {
            return res.status(404).send({ message: 'Data pendaftaran tidak ditemukan.' });
        }

        if (enrollment.Class.lecturer_id !== req.userId) {
            return res.status(403).send({ message: 'Akses ditolak. Anda bukan pengajar kelas ini.' });
        }

        await enrollment.update({ grade: grade });

        res.status(200).send({ message: 'Nilai berhasil diupdate.' });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};