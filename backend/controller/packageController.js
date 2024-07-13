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
        const destination = req.body.destination;
        const startDate = req.body.startDate;
        const endDate=req.body.endDate;
        const minPrice=req.body.minPrice;
        const maxPrice=req.body.maxPrice;
        const trending = req.body.trending;

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
        if (trending){
            query.trending= trending
        }

        const packages = await Package.find(query);

        res.status(200).json({ packages });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePackage = async (req, res) => {
    try {
        const packageId = req.params.id;
        const updateFields = req.body;

        const updatedPackage = await Package.findByIdAndUpdate(packageId, updateFields, { new: true });

        res.status(200).json({ message: 'Package updated successfully', package: updatedPackage });
    } catch (error) {
        console.error('Error updating package:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePackage = async (req, res) => {
    try {
        const packageId = req.params.id;

        await Package.findByIdAndDelete(packageId);

        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        console.error('Error deleting package:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addPackage, fetchPackage, updatePackage, deletePackage };
