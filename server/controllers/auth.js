// routes/auth.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', (req, res, next) => {
  console.log(req.query);  
  next();
}, passport.authenticate('google', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect('http://localhost:3000');  
});


export default router;
