// routes/auth.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Route to initiate Google login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle Google callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to frontend or send a response
    res.redirect('http://localhost:3000'); // Adjust this as needed
  }
);

export default router;
