const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const config = require('./config');

const User = require('./models/user');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    _secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error.false);
    }
}));

// LOCAL STRATEGY

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email });

    if(!user) {
        return done(null, false);
    }
}));

// Google OAuth Strategy

// passsport.use('googleToken', new GooglePlusTokenStrategy({
//     clientID: config.oauth.google.clientID,
//     clientSecret: config.oauth.google.clientSecret
// }, async (accessToken, refreshToken, profile, done) => {

//     try {
//         console.log('accessToken', accessToken);
//         console.log('refreshToken', refreshToken);
//         console.log('profile', profile);
//     } catch(error) {
//         done(error, false, error.message);
//     }
// }));

passport.use("googleToken", new GooglePlusTokenStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
    } catch (error) {
        done(error, false, error.message);
    }
}));