// models/itineraryModel.js
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to user
        required: true
    },
    services: [{
        type: String,
        required: true
    }],
    dates: {
        type: [Date],
        required: true
    },
    customPlans: {
        type: String
        //i have idea for this that cannot be explained with comment that is why it is string
    }
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
