const Event = require('../models/EventsModel');

const searchEvent = async (req, res ) =>{
    try{
        const query = req.body.title;
        const category = req.body.category;
        const date = req.body.eventDate;

        const event = await Event.find({
            ...(query && { title: { $regex: query, $options: 'i' } }),
            ...(category && { category }),
            ...(date && { date }),
        });
        res.json(event);
    }catch (err){
        console.error(err)
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

const addEvent = async (req,res) =>{
    const { title, category, date, location, description,price } = req.body;

    const newEvent = new Event({
        title,
        category,
        date,
        location,
        description,
        price,
    });

    try{
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    searchEvent,
    addEvent
}