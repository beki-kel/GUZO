const Notification = require('../models/NotificationsModel'); // Import your Notification model
const User = require('../models/userModel');

const notificationsCtr = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        // Check if the user exists this is just for validation of user that it actually exists other than that it has no use to notification retreival
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Retrieve notifications associated with the user
        // Remember that the userId is going to be the id of the user that the notification was suppos to be send
        const notifications = await Notification.find({ recipientId: req.params.userId });

        res.status(200).json({ notifications });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = notificationsCtr