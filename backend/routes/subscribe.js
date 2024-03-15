const express = require('express');
const router = express.Router();

router.post('/subscribe', (req, res)=>{
    const {email} = req.body;

    if(!email){
        res.status(400).json({message:'No email submitted'})
    }

    res.status(200).json({message:`Succesfully Subscribed with email: ${email}`})
})

module.exports =  router