const ThingsToDo = require('../models/thingsToDoModel');

const addThingsToDo = async (req, res) => {
    try {
        const {
            name,
            description,
            location,
            category,
            price,
            duration,
            rating,
            reviews,
            image
        } = req.body;

        const newThingToDo = new ThingsToDo({
            name,
            description,
            location,
            category,
            price,
            duration,
            rating,
            reviews,
            image
        });

        await newThingToDo.save();

        res.status(201).json({ message: 'Thing to do added successfully', thingToDo: newThingToDo });
    } catch (error) {
        console.error('Error adding thing to do:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const fetchThingsToDo = async (req, res) => {
    try {
        const { location, category, minPrice, maxPrice } = req.body;

        if(!location || !category || !minPrice || !maxPrice){
            res.status(400).status({message:'Please Enter all the Fields'})
        }

        const query = {};
        if (location) {
            query.location = location;
        }
        if (category) {
            query.category = category;
        }
        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        }

        const thingsToDo = await ThingsToDo.find(query);

        res.status(200).json({ thingsToDo });
    } catch (error) {
        console.error('Error fetching things to do:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {addThingsToDo , fetchThingsToDo}