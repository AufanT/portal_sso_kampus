const multer = require('multer');
const path = require('path');

// Tentukan lokasi penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 'cb' adalah callback. Parameter pertama untuk error (null jika tidak ada),
        // kedua adalah folder tujuan.
        cb(null, 'public/uploads/'); 
    },
    filename: function (req, file, cb) {
        // Buat nama file yang unik untuk menghindari nama yang sama
        // Format: timestamp-namaasli.extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Inisialisasi multer dengan konfigurasi storage
const upload = multer({ storage: storage });

module.exports = upload;