const User= require('../models/userModel')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const login = async (req, res,next) => {
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return res.status(404).json({ message: 'User not found'})

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return res.status(400).json({ message: 'Wrong password' })
        const token=jwt.sign({id:user.id,isAdmin:user.isAdmin},process.env.JWT)
        const {password,isAdmin,...otherDetails}= user._doc;
        res.cookie("access_token",token,{httpOnly:true,}).status(201).json({...otherDetails})
    }catch(err){
        next(err)
}
}

module.exports = login;