//This is yours but i want to use the userModelSchema so small code written
//this is simple registration not finished yet
const express = require('express')
const User = require('../config/models/userModel')
const router = express.Router()

router.get('/register', async (req, res)=>{
    const {fname, lname, username, email, password} = req.body

    try {
        if (!fname || !lname || !username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const newUser = new User({ fname, lname, username, email, password });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router