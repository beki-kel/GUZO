const Promotion = require('../models/promotionsModel');

const promotionCtr = async (req, res) => {
    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
        // Respond with 400 status code for Bad Request
        return res.status(400).json({ message: "Not all fields filled properly" });
    }

    try {
        // Create a new promotion document using the Promotion model
        const promotion = new Promotion({
            title: title,
            description: description,
            imageUrl: imageUrl
        });
        
        await promotion.save()
        // Respond with 200 status code for successful creation
        return res.status(200).json({ message: "Successfully posted a promotion/ADs" });
    } catch (error) {
        // Handle any errors that occur during the creation process
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const promotionfetchCtr = async (req, res) => {
    try {
        // Fetch all promotion documents from the database
        const promotions = await Promotion.find();

        // Respond with the fetched promotion data
        return res.status(200).json({ promotions });
    } catch (error) {
        // Handle any errors that occur during the fetching process
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {promotionCtr,promotionfetchCtr};
