const mongoose = require("mongoose")

const promotionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion