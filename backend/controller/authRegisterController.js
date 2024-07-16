const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      if (err.keyPattern.username) {
        res.status(409).json({ message: 'Username already exists. Please choose a different one.' });
      } else if (err.keyPattern.email) {
        res.status(409).json({ message: 'Email already exists. Please use a different one.' });
      } else {
        res.status(409).json({ message: 'Duplicate key error. Please choose different values.' });
      }
    } else if (err.name === 'ValidationError') {
      res.status(422).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An error occurred during registration. Please retry.' });
    }
    next(err);
  }
};

module.exports = register;
