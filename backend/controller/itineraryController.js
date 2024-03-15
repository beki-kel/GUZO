const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const itinerary = async (req, res) => {
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

module.exports = itinerary;
