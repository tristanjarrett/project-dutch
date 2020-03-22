const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
const verify = require('./token');

// register
router.post('/register', async (req, res) => {

    // validate data before creating user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // check if user exists already
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        // res.send(savedUser);
        res.send({user: user._id})
    } catch(err) {
        res.status(400).send(err);
    }
});

// login
router.post('/login', async (req, res) => {

    // validate data before logging in
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // find user by email
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email not found');

    // check if password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // create and assign token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    res.header('auth-token', token).send(token);
    // res.send('Logged in');
});

module.exports = router;