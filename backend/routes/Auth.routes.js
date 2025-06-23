const express = require('express');
const router = express.Router();
const { login } = require('../controllers/Auth.controller');
const { register } = require('../controllers/Auth.controller');

router.post('/login', login);
router.post('/register', register);


module.exports = router;