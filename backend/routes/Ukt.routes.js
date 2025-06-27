const express = require('express');
const router = express.Router();

const { verifyToken } = require("../middlewares/authenticate.js");
// Kita asumsikan Anda akan membuat middleware 'isAdmin' nanti
// const { isAdmin } = require("../middlewares/authorize.js");
const { isMahasiswa } = require("../middlewares/authorize.js");
const controller = require("../controllers/Ukt.controller.js");

// Rute untuk Mahasiswa
router.get("/my-bills", [verifyToken, isMahasiswa], controller.getMyBills);

// Rute untuk Admin (jika Anda ingin membuatnya)
// router.post("/create", [verifyToken, isAdmin], controller.createBill);

module.exports = router;