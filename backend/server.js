const express = require('express')
const donenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const colors = require('colors')

connectDB()

const app  = express()

//this middleware is to use the req.body otherwise it will be undefined
app.use(express.json())
app.use(express.urlencoded({extended : false}))
//.........................

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, ()=>console.log(`server started on ${port}`))