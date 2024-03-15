const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const Itinerary = require('../models/ItineraryModel')

const itineraryuserData = async (req, res) => {
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
};

const createItinerary = async (req, res)=>{
    const { services, dates, customPlans } = req.body;
    try{
        const userId = req.params.userId

        const newItinerary = new Itinerary({
            userId: userId,
            services: services,
            dates: dates,
            customPlans: customPlans
        })
        res.status(201).json({ message: 'Itinerary created successfully', itinerary: newItinerary });
        await newItinerary.save()
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const itinerary = async (req, res)=>{
    const { services, dates, customPlans } = req.body;

    try {
        // Find the itinerary by ID
        const itinerary = await Itinerary.findOne({ userId: req.params.userId });

        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        // Update the itinerary fields
        if (services) {
            itinerary.services = services;
        }
        if (dates) {
            itinerary.dates = dates;
        }
        if (customPlans) {
            itinerary.customPlans = customPlans;
        }

        // Save the updated itinerary
        await itinerary.save();

        res.status(200).json({ message: 'Itinerary updated successfully', itinerary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {itineraryuserData, itinerary, createItinerary};
