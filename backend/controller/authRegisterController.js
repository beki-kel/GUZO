const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(201).json({ message: 'User created successfully', user: newUser })
    } catch (err) {
        //this is for the frontend 
        res.status(400);
        next(err)
    }
}


module.exports = register;
