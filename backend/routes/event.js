const express = require('express');
const router = express.Router();

const { searchEvent, addEvent } = require('../controller/eventController');

// Search events
router.post('/searchEvent', searchEvent);

// Add event
router.post('/addEvent', addEvent);

module.exports = router;
