import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

passport.use(
  new GoogleStrategy(
    {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
