import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const postSignup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      oauthProvider,
      role,
      skills,
      oauthId,
      profilePictures,
      bio,
    } = req.body;

    // check oauthprovider and password

    if (!password) {
      return res.status(400).json({ message: "Please provide password." });
    }

    // already exist user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // bcrypt password
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      oauthProvider: oauthProvider || null,
      role,
      skills,
      oauthId: oauthId || null,
      profilePictures,
      bio,
    });
    // save user to database
    const savedUser = await user.save();
    // generate token
    const token = jwt.sign(
      {
        id: savedUser,
        email: savedUser.email,
        role: savedUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(201).json({
      message: "User created successfully",
      token,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ message: "User logged in successfully", token, success: true });
  } catch (err) {
    console.log(err);
  }
};


export { postSignup , postLogin};
