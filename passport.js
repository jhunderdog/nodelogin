const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const { JWT_SECRET } = require('./config');
const User = require('./models/user');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    _secretOrKey: JWT_SECRET
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
