const express = require('express');
const router = express.Router();
const notificationsCtr = require('../controller/notificationsController')
const {verifyUser,verifyAdmin} = require('../utils/verifyToken')

router.get('/notifications/:userId',verifyUser, notificationsCtr)

module.exports = router;
