const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    destinations: [{
        type: String,
        required: true
    }],
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    includes: [{
        type: String
    }],
    excludes: [{
        type: String
    }],
    activities: [{
        type: String
    }],
    image: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reviews: [{
        reviewerName: String,
        rating: Number,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    availability: {
        availableDates: [Date],
        maxCapacity: Number
    },
    bookings: [{
        bookingID: String,
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending'
        },
        paymentDetails: {
            paid: Boolean,
            amount: String
        }
    }],
    geoLocation: {
        latitude: Number,
        longitude: Number
    },
    tags: [String],
    promotionalInfo: {
        discount: Number,
        startDate: Date,
        endDate: Date,
        bannerImage: String
    },
    trending:{
        type:Boolean,
        required: true
    }
});

const Package = mongoose.model('Package', packageSchema);
module.exports = Package;
