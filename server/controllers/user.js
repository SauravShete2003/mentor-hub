import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Session from "../models/Session.js";
import dotenv from "dotenv";
dotenv.config();

const postSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      oauthProvider,
      role,
      skills,
      oauthId,
      profilePictures,
      bio,
    } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Please provide password." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
      oauthProvider: oauthProvider || null,
      role,
      skills,
      oauthId: oauthId || null,
      profilePictures,
      bio,
    });

    const savedUser = await user.save();
    const token = jwt.sign(
      {
        id: savedUser._id,
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
    if (
      !user ||
      (user.password && !(await bcrypt.compare(password, user.password)))
    ) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const sessionToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    await Session.create({
      userId: user._id,
      sessionToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    res.cookie("connect.sid", "cookie_value", {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });
    return res.status(200).json({
      message: "Logged in successfully",
      token: sessionToken,
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error during login" });
    }
  }
};

const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const playload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(playload.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const newSessionToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );
    const newSession = await Session.findByIdAndUpdate(
      {
        userId: user._id,
        sessionToken: newSessionToken,
      },
      {
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
  } catch (err) {
    console.log(err);
  }
};

const userLogout = async (req, res) => {
  const { userId } = req.body;
  await Session.deleteMany({ userId });
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully", success: true });
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  res.json({
    message: "User fetch Successfully",
    data: user,
    success: true,
  });
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({
    message: "Users fetch Successfully",
    data: users,
    success: true,
  });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { profilePictures, bio, skills, name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    {
      $set: {
        profilePictures,
        bio,
        skills,
        fullName,
        email,
      },
    },
    { new: true }
  );
  res.json({
    message: "User Updated Successfully",
    data: user,
    success: true,
  });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOneAndDelete(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  res.json({
    message: "User Deleted Successfully",
    data: user,
    success: true,
  });
};
export {
  postSignup,
  postLogin,
  refreshUserToken,
  userLogout,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
};
