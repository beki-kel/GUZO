const express = require('express');
const router = express.Router();

const { searchEvent, addEvent } = require('../controller/eventController');

// Search events
router.post('/search/Event', searchEvent);

// Add event
router.post('/add/Event', addEvent);

module.exports = router;
