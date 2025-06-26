const express = require('express');
const router = express.Router(); 

const authenticate = require("../middlewares/authenticate.js");
const controller = require("../controllers/Jadwal.controller.js");

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/", [authenticate.verifyToken, authenticate.getUserWithRole], controller.getJadwalUser);
router.post("/presensi", [authenticate.verifyToken, authenticate.isMahasiswa], controller.lakukanPresensi);
router.get("/presensi/:classId", [authenticate.verifyToken], controller.lihatPresensi);

module.exports = router;