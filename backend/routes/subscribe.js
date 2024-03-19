const express = require('express');
const router = express.Router();
const subscribeCtr = require('../controller/subscribeController');

router.post('/subscribe/:userId', subscribeCtr)

module.exports = router