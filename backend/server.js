const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// Corrected route path: '/api/flights/search'
app.use('/api/flights/serach', require('./routes/searchRoutes'));


app.listen(port, () => console.log(`Server started on ${port}`));
