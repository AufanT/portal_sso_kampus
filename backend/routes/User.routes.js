const express = require('express');
const router = express.Router();

// Impor middleware dan controller yang dibutuhkan
const { verifyToken } = require("../middlewares/authenticate.js");
const controller = require("../controllers/User.controller.js");

// Rute untuk mendapatkan profil user yang sedang login
router.get("/profile", [verifyToken], controller.getProfile);

// Rute untuk memperbarui profil user yang sedang login
router.put("/profile", [verifyToken], controller.updateProfile);

module.exports = router;