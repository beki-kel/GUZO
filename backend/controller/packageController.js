const Package = require('../models/packageModel');

const addPackage = async (req, res) => {
    try {
        const {
            name,
            description,
            destinations,
            duration,
            price,
            startDate,
            endDate,
            includes,
            excludes,
            activities,
            image,
            availability,
            tags,
            promotionalInfo
        } = req.body;

        const newPackage = new Package({
            name,
            description,
            destinations,
            duration,
            price,
            startDate,
            endDate,
            includes,
            excludes,
            activities,
            image,
            availability,
            tags,
            promotionalInfo
        });

        await newPackage.save();

        res.status(201).json({ message: 'Package added successfully', package: newPackage });
    } catch (error) {
        console.error('Error adding package:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const fetchPackage = async (req, res) => {
    try {
        const { destination, startDate, endDate, minPrice, maxPrice } = req.query;

        
        if(!destination || !startDate || !endDate || !minPrice || !maxPrice){
            res.status(400).status({message:'Please Enter all the Fields'})
        }

        const query = {};
        
        if (destination) {
            query.destinations = destination;
        }
        if (startDate && endDate) {
            query.startDate = { $gte: new Date(startDate) };
            query.endDate = { $lte: new Date(endDate) };
        }
        if (minPrice && maxPrice) {
            query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
        }

        const packages = await Package.find(query);

        res.status(200).json({ packages });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {addPackage , fetchPackage}