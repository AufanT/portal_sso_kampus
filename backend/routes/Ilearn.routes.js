const express = require('express');
const router = express.Router();

const authenticate = require("../middlewares/authenticate.js");
const upload = require("../middlewares/upload.js"); 
const controller = require("../controllers/Ilearn.controller.js");

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Rute POST untuk mengunggah file
// Middleware dijalankan berurutan: verifikasi token -> cek peran dosen -> baru proses upload
router.post(
    "/upload", 
    [authenticate.verifyToken, authenticate.isDosen, upload.single('file')], 
    controller.uploadMateri
);

// Rute GET untuk melihat materi berdasarkan ID kelas
router.get(
    "/materi/:classId", 
    [authenticate.verifyToken], 
    controller.getMateriByClass
);

module.exports = router;