const express = require('express');
const router = express.Router();
const notificationsCtr = require('../controller/notificationsController')

router.get('/notifications/:userId', notificationsCtr)

module.exports = router;
