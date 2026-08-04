const r = require('express').Router();
const c = require('../controllers/authController');
const auth = require('../middleware/auth');
const passport = require('../config/passport');

r.post('/register', c.register);
r.post('/login', c.login);
r.get('/me', auth, c.me);
r.put('/me', auth, c.updateMe);

// ── Google OAuth ──
r.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

r.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth`, session: false }),
    (req, res) => {
        const { token } = req.user;
        // Redirect to client with token in query param; client reads and stores it
        res.redirect(`${process.env.CLIENT_URL}/oauth-callback?token=${token}`);
    }
);

module.exports = r;