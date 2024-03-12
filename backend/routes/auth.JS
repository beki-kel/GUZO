const express = require('express');
const router = express.Router();
const register = require('../controller/authController.js');

router.post('/', register)

module.exports = router;