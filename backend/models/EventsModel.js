const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Music', 'Sports', 'Art', 'Technology'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
