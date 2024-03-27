const User= require('../models/userModel')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const login = async (req, res,next) => {
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return res.status(404).json({ message: 'User not found'})

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return res.status(400).json({ message: 'Wrong password' })
        //this generates a token when the user loges in based on .env file
        const token = jwt.sign({id:user.id,isAdmin:user.isAdmin},process.env.JWT)
        //it removes sensetive info from the object
        const {password,isAdmin,...otherDetails}= user._doc;
        //it sends response status excluding password and isAdmin
        res.cookie("access_token", token, { httpOnly:true }).status(201).json({ token, ...otherDetails });

    }catch(err){
        next(err)
    }
}

module.exports = login;