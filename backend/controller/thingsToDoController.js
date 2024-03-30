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

const updateThingsToDo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedThingToDo = await ThingsToDo.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ message: 'Thing to do updated successfully', updatedThingToDo });
    } catch (error) {
        console.error('Error updating thing to do:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteThingsToDo = async (req, res) => {
    try {
        // Extracting the thing to do ID from request parameters
        const { id } = req.params;

        // Finding the thing to do by ID and deleting it
        const deletedThingToDo = await ThingsToDo.findByIdAndDelete(id);

        if (!deletedThingToDo) {
            return res.status(404).json({ message: 'Thing to do not found' });
        }

        res.status(200).json({ message: 'Thing to do deleted successfully' });
    } catch (error) {
        console.error('Error deleting thing to do:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { addThingsToDo, fetchThingsToDo, updateThingsToDo, deleteThingsToDo };