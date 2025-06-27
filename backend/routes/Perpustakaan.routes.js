const express = require('express');
const router = express.Router();

const { verifyToken } = require("../middlewares/authenticate.js");
const controller = require("../controllers/Perpustakaan.controller.js");

router.get("/books", [verifyToken], controller.getAllBooks);
router.post("/borrow", [verifyToken], controller.borrowBook);
router.get("/history", [verifyToken], controller.getBorrowHistory);

module.exports = router;