const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_BASE = process.env.GOOGLE_CALLBACK_BASE || 'http://localhost:5000';

// Strategy 1: Google OAuth for USERS
console.log("Using CLIENT ID:", GOOGLE_CLIENT_ID);
passport.use('google-user',
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CALLBACK_BASE}/api/auth/google/user/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName || 'Google',
            lastName: profile.name.familyName || 'User',
            role: 'user',
            isOnboarded: true,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Strategy 2: Google OAuth for VENDORS
passport.use('google-vendor',
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CALLBACK_BASE}/api/auth/google/vendor/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName || 'Vendor',
            lastName: profile.name.familyName || 'User',
            role: 'vendor',
            isOnboarded: false,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
