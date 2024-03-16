const mongoose = require('mongoose');

const carSchema= new mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true,
    },
    palteNo : {
        type:String,
        required:true,
        unique:true
    },
    color: String,
    capacity: Number,
    pickUp:String,
    dropOff:String,
    numberOfPassengers:Number,
    driverID:String,
    drivername:String,
    driverrating:String,
})
