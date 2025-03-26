const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../middleware/passport'); // Ensure passport is configured

// Traditional Login & Signup
const { signup, login, getUserProfile, googleLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);

// ✅ Google OAuth Login (Redirect-Based)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { user, token } = req.user;
    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  }
);

// ✅ Google OAuth Login (API-Based for React Login)
router.post('/google-login', googleLogin);

module.exports = router;
