const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 8800;
const cookieParser=require('cookie-parser')
const cors = require('cors')

//baslael's import
const subscribe = require('./routes/subscribe')
const notification = require('./routes/notifications')
const itinerary = require('./routes/itinerary')
const promotion = require('./routes/promotion')

//bk's Imports
const authRoute = require('./routes/auth.JS')

const accommodationRoute=require('./routes/Accommodations')

const transportRoute = require('./routes/transportation')

const dinningRoute=require('./routes/dining')

const userRoute=require('./routes/users')

const bodyParser = require('body-parser');



connectDB()

const app = express();

app.use(cors({
    origin:["https://guzo-pack.vercel.app/"],
    methods:["POST","GET","PUT","DELETE"],
    credentials: true
}))

app.get("/",(req,res)=>{
    res.json("Server is running");
})

app.use(cookieParser())
app.use(bodyParser.json());
app.use('/', accommodationRoute)
app.use('/', subscribe)
app.use('/', notification)
app.use('/', itinerary)
app.use('/', authRoute)
app.use('/', transportRoute)
app.use('/', promotion)
app.use('/', dinningRoute)
app.use('/', userRoute)

//error handler middleware
app.use( (err,req,res,next) => {
    const errorStatus=err.status || 500
    const errorMsg=err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message: errorMsg,
        stack:err.stack,
})
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
