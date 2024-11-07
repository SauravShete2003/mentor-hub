import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


import { postLogin, postSignup } from "./controllers/user.js";
import emailRoutes from "./controllers/emailRoutes.js";
import router from "./controllers/emailRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());


app.use(
  session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
const mongoDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}`);
    if (conn) {
      console.log("MongoDB Connected successfully✅");
    }
  } catch (err) {
    console.log(err);
  }
};
mongoDB();

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.use("/auth", router); 
app.use("/", emailRoutes); 

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000'); 
  }
);

// User API routes
app.post('/signup', postSignup);
app.post('/login', postLogin);

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} 👍🏻`);
});
