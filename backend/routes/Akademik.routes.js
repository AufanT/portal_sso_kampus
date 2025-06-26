const express = require('express');
const router = express.Router();

const authenticate = require("../middlewares/authenticate.js");
const controller = require("../controllers/Akademik.controller.js");

// Middleware untuk header
router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// --- Rute untuk Mahasiswa ---
router.get("/krs", [authenticate.verifyToken, authenticate.isMahasiswa], controller.getKrs);
router.post("/krs", [authenticate.verifyToken, authenticate.isMahasiswa], controller.isiKrs);
router.get("/khs", [authenticate.verifyToken, authenticate.isMahasiswa], controller.getKhs);
router.get("/transkrip", [authenticate.verifyToken, authenticate.isMahasiswa], controller.getTranskrip);

// --- Rute untuk Dosen ---
router.get("/kelas-dosen", [authenticate.verifyToken, authenticate.isDosen], controller.getKelasDosen);
router.get("/mahasiswa-kelas/:classId", [authenticate.verifyToken, authenticate.isDosen], controller.getMahasiswaByKelas);
router.post("/input-nilai", [authenticate.verifyToken, authenticate.isDosen], controller.inputNilai);

module.exports = router;