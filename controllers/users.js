const User = require('../models/user');
const JWT = require('jsonwebtoken');

const { JWT_SECRET } = require('../config')

signToken = (user) => {
    return JWT.sign({
        iss: 'CodeWorker',
        sub: user.id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() +1) //current time + 1day ahead
    }, JWT_SECRET);
}

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

        const token = signToken(newUser);
        res.status(200).json({ user: token});
        console.log(token);


    },

    signIn: async (req, res, next) => {
        // Generate token
        console.log('UsersController.signIn() called!');
        const token = signToken(req.user);
        console.log(token);
        res.status(200).json({ token });
    },

    secret: async (req, res, next) => {
        console.log('UsersController.secret() called!');
    }

};