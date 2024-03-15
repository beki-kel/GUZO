const User = require('../models/userModel')

const itinerary = async (req, res)=> {
    const user = await User.findById(req.params.userId)
    const newUserData = req.body;

    if(!user){
        res.status(400).json({error: "User not found!"})
    }

    if(user.id === req.params.userId){

        User.findByIdAndUpdate(req.params.userId, newUserData, {new:true})
        res.json({message:"Data updated!"})
    }
    else{
       res.status(404).json({error:"Data Not Updated!"})
    }
}

module.exports = itinerary