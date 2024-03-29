const mongoose = require('mongoose');

const thingsToDoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        reviewerName: String,
        rating: Number,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ThingsToDo = mongoose.model('ThingsToDo', thingsToDoSchema);
module.exports = ThingsToDo;
