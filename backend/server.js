const express = require('express');
const dotenv = require('dotenv').config();
const colors=require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use('/api/flights/serach', require('./routes/searchRoutes')); // Correct the typo in the endpoint path

app.listen(port, () => {

  console.log(`Server started on ${port}`);
});
