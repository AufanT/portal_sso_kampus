const express = require('express');
const router = express.Router();

const { verifyToken } = require("../middlewares/authenticate.js");
const { isDosen, isMahasiswa } = require("../middlewares/authorize.js");
const controller = require("../controllers/Akademik.controller.js");

// --- Rute untuk Mahasiswa ---
router.get("/kelas-tersedia", [verifyToken, isMahasiswa], controller.getKelasTersedia);
router.get("/krs", [[verifyToken, isMahasiswa]], controller.getKrs);
router.post("/krs", [[verifyToken, isMahasiswa]], controller.isiKrs);
router.get("/khs", [[verifyToken, isMahasiswa]], controller.getKhs);
router.get("/transkrip", [[verifyToken, isMahasiswa]], controller.getTranskrip);

// --- Rute untuk Dosen ---
router.get("/kelas-dosen", [verifyToken, isDosen], controller.getKelasDosen);
router.get("/mahasiswa-kelas/:classId", [verifyToken, isDosen], controller.getMahasiswaByKelas);
router.post("/input-nilai", [verifyToken, isDosen], controller.inputNilai);

module.exports = router;