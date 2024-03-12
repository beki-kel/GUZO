const User= require('../models/userModel')
const register = async (req, res,next) => {
    try{
        const newUser = new User({
            username:req.body.username,
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:req.body.password,
        })

        await newUser.save()
        res.status(201).json({ message: 'User created successfully', user: newUser })
    }catch(err){
        next(err)
}
}

module.exports = register