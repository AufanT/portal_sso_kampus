const express = require('express');
const router = express.Router();

const { verifyToken } = require("../middlewares/authenticate.js");
const { isDosen } = require("../middlewares/authorize.js");
const upload = require("../middlewares/upload.js"); 
const controller = require("../controllers/Ilearn.controller.js");

router.post(
    "/upload", 
    [verifyToken, isDosen, upload.single('file')], 
    controller.uploadMateri
);

router.get(
    "/materi/:classId", 
    [verifyToken], 
    controller.getMateriByClass
);

module.exports = router;