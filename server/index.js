import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


import { postLogin, postSignup } from "./controllers/user.js";
import emailRoutes from './controllers/emailRoutes.js'
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

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

//nodemail
app.use('/', emailRoutes);
// user api
app.post('/signup' , postSignup);
app.post('/login' , postLogin);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}👍🏻`);
});
