const User = require('../models/userModel')
const bcrypt = require('bcryptjs');

const getUser = async(req,res,next) =>{
    try{
        await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(error){
        next(error)
    }
}

const getUsers = async(req, res, next) =>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        next(error)
    }
}

const updateUser = async( req,res,next ) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        if (user.id !== req.params.userId) {
            return res.status(403).json({ error: "Unauthorized action!" });
        }

        const newUserData = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        newUserData.password = hash;

        const updatedUser = await User.findByIdAndUpdate(req.params.userId, newUserData, { new: true });

        if (!updatedUser) {
            return res.status(500).json({ error: "Failed to update user!" });
        }

        res.json({ message: "Data updated!", body: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

const deleteUser = async( req,res,next ) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'User Deleted Successfully', user})
    }catch(error){
        next(error)
    }
}

module.exports= {getUser,getUsers,updateUser,deleteUser}