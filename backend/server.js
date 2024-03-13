const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 8800;

//baslael's import
const bookFlightRoutes = require('./routes/bookFlight')
const bookAccommodations = require('./routes/bookAccommodations')
const subscribe = require('./routes/subscribe')
const notification = require('./routes/notifications')

//bk's Imports
const authRoute = require('./routes/auth.JS')
const cookieParser=require('cookie-parser')
const accommodationRoute=require('./routes/Accommodations')

const bodyParser = require('body-parser');

connectDB()

const app = express();

app.use(cookieParser())
app.use(bodyParser.json());

app.use('/', bookFlightRoutes)
app.use('/', accommodationRoute)
app.use('/', subscribe)
app.use('/', notification)
app.use('/', authRoute)


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
