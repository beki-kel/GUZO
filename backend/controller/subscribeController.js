const User = require('../models/userModel');

const subscribeCtr = async (req, res) => {
    const { email } = req.body;
    const userId = req.params.userId;


    try {
        //this will find the user by id if it exists in the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!email) {
            return res.status(400).json({ message: 'No email submitted' });
        }
        //check if he/she is subscribed
        if (user.isSubscribed === true) {
            return res.status(200).json({ message: 'Already Subscribed' });
        }
        //else subcribe him to news letter
        user.isSubscribed = true;
        await user.save();

        return res.status(200).json({ message: `Successfully Subscribed with email: ${email}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = subscribeCtr;
