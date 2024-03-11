const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//don't change the 'User' name cause i have used it in the notificationsModel
const User = mongoose.model('User', userSchema);

module.exports = User;
