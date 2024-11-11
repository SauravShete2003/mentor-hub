import express from 'express';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  async (req, res) => {
    const { id: oauthId, displayName: name, emails, photos } = req.user;
    const email = emails[0].value;
    const picture = photos[0].value;

    try {

      let user = await User.findOne({ oauthId });

      if (!user) {
        user = new User({
          name,
          email,
          oauthProvider: 'google',
          oauthId,
          profilePictures: picture,
          isVarified: true,
        });
        await user.save();
      }

      res.redirect('http://localhost:3000');
    } catch (error) {
      console.error('Error during user save or lookup:', error);
      res.status(500).send('Internal Server Error');
    }
  }
);

export default router;
