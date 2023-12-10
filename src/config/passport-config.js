// passport-config.js

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../models/user');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key', // Replace with your actual secret key
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    // Find the user based on the JWT payload
    const user = await User.findById(jwtPayload.userId);

    if (user) {
      // If the user is found, authenticate the request
      return done(null, user);
    } else {
      // If the user is not found, reject the request
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use('jwt', jwtStrategy);

// Export the passport object
module.exports = passport;