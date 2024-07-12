const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Community Events', 'Sports', 'Art', 'Technology','Entertainment Events','Fashion Events','Healthcare Events','Education Events'],
        required: true
    },
    date: {
        type: String,
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
