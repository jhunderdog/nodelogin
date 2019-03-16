const User = require('../models/user');

module.exports = {

    signUp: async (req, res, next) => {
        // Email & Password
        // req.value.body
        console.log('contents of req.value.body', req.value.body);
        console.log('UsersController.signUp() called!');

        const { email, password } = req.value.body;
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({error: 'Email is already in use'});
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(200).json({ user: 'created'});


    },

    signIn: async (req, res, next) => {
        // Generate token
        console.log('UsersController.signIn() called!');
    },

    secret: async (req, res, next) => {
        console.log('UsersController.secret() called!');
    }

};