const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const sign = (u) =>
    jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/google/callback`,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) return done(new Error('No email from Google'), null);

                // Find existing user by google_id or email
                let user = await User.findOne({ google_id: profile.id });
                if (!user) {
                    user = await User.findOne({ email });
                    if (user) {
                        // Link Google account to existing email account
                        user.google_id = profile.id;
                        if (!user.full_name) user.full_name = profile.displayName;
                        await user.save();
                    } else {
                        // Create new user
                        user = await User.create({
                            google_id: profile.id,
                            email,
                            full_name: profile.displayName,
                        });
                    }
                }

                const token = sign(user);
                return done(null, { user, token });
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

module.exports = passport;
