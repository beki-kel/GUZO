const express = require('express');
const router = express.Router();
const register = require('../controller/authRegisterController.js');
const login=require('../controller/authLoginController.js')

router.post('/auth/register', register)
router.post('/auth/login',login)

module.exports = router;