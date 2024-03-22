const User= require('../models/userModel')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Wrong password' });

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT);
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Send the token in the response header
        res.cookie("access_token", token, { httpOnly: true });

        // Send other user details in the response body
        res.status(200).json({ token, ...otherDetails });
    } catch (err) {
        next(err);
    }
}

module.exports = login;


module.exports = login;