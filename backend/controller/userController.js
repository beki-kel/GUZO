const User = require('../models/userModel')

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
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true });
        res.status(200).json({message:'User Updated Successfully', user})
    }catch(error){
        next(error)
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