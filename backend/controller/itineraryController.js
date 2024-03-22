const Itinerary = require('../models/ItineraryModel')

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
        
        await newItinerary.save()
        res.status(201).json({ message: 'Itinerary created successfully', itinerary: newItinerary });
        
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

module.exports = {itinerary, createItinerary};
