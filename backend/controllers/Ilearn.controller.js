const db = require('../models');
// Nama model tetap ElearningMaterial sesuai definisi kita sebelumnya
const ElearningMaterial = db.ElearningMaterial; 

// Fungsi untuk Dosen mengunggah materi baru
exports.uploadMateri = async (req, res) => {
    try {
        // Validasi: pastikan file berhasil diunggah
        if (!req.file) {
            return res.status(400).send({ message: "File tidak ditemukan. Pastikan Anda menyertakan file." });
        }

        // Ambil data dari request
        const { class_id, title, description } = req.body;
        const filePath = req.file.path; // Path file yang disimpan oleh multer

        if (!class_id || !title) {
            return res.status(400).send({ message: "Judul dan ID kelas wajib diisi." });
        }

        // Simpan informasi ke database
        const newMaterial = await ElearningMaterial.create({
            class_id: class_id,
            title: title,
            description: description,
            file_url: filePath // Simpan path-nya
        });

        res.status(201).send({
            message: "Materi berhasil diunggah!",
            data: newMaterial
        });

    } catch (error) {
        console.error("Error saat upload materi:", error);
        res.status(500).send({ message: "Terjadi kesalahan pada server." });
    }
};

// Fungsi untuk Mahasiswa/Dosen melihat semua materi per kelas
exports.getMateriByClass = async (req, res) => {
    // Ambil classId dari parameter URL (misal: /api/ilearn/materi/5)
    const { classId } = req.params;

    try {
        const materials = await ElearningMaterial.findAll({
            where: { class_id: classId },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).send(materials);

    } catch (error) {
        console.error("Error saat mengambil materi:", error);
        res.status(500).send({ message: "Terjadi kesalahan pada server." });
    }
};