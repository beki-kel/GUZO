const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

//baslael's import
const bookFlightRoutes = require('./routes/bookFlight')
const bookAccommodations = require('./routes/bookAccommodations')
const subscribe = require('./routes/subscribe')
const notification = require('./routes/notifications')

//bk's Imports
const authRoute = require('./routes/auth.JS')

const bodyParser = require('body-parser');

connectDB()

const app = express();
app.use(bodyParser.json());

app.use('/', bookFlightRoutes)
app.use('/', bookAccommodations)
app.use('/', subscribe)
app.use('/', notification)
app.use('/auth/register', authRoute)


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
