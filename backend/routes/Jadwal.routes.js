const express = require('express');
const router = express.Router(); 

const { verifyToken } = require("../middlewares/authenticate.js");
const { isMahasiswa, getUserWithRole } = require("../middlewares/authorize.js");
const controller = require("../controllers/Jadwal.controller.js");

router.get("/", [verifyToken, getUserWithRole], controller.getJadwalUser);
router.post("/presensi", [verifyToken, isMahasiswa], controller.lakukanPresensi);
router.get("/presensi/:classId", [verifyToken], controller.lihatPresensi);

module.exports = router;