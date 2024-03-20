const mongoose = require('mongoose');


const carSchema= new mongoose.Schema({
    externalId:{type: String, unique: true},
    brand:{type:String,required:true},
    owner:{type:String,required:true,},
    plateNo: { type: String, required: true, unique: true },
    color: {type:String},
    capacity: {type:Number, required:true},
    pickUp:{type:String},
    dropOff:{type:String},
    numberOfPassengers:{type:Number},
    driverID:{type:String, required:true},
    drivername:{type:String , required:true},
    driverrating:{type: Number,min: 1,max: 10},
    finalPrice: Number,
})

const Car= mongoose.model('Car', carSchema);
module.exports = Car;