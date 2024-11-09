import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Session from "../models/Session.js";

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
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    if (user.password && !(await bcrypt.compare(password, user.password))) {
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

    const session = await Session.create({
      userId: user._id,
      sessionToken,
      expiresAt: new Date(Date.now()+ 15 *60 *1000),
    });
    
    res.cookie("refreshToken" , refreshToken, {httpOnly : true});
    res.status(200).json({ message: "Logged in successfully", token: sessionToken, success: true , user });

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
  }};

  const refreshUserToken = async (req ,res)=>{
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken){
        return res.status(401).json({message: "Unauthorized" , success: false});
      }
      try{
        const playload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(playload.userId);
        if(!user){
          return res.status(401).json({message: "Unauthorized" , success: false});
          }
          const newSessionToken = jwt.sign({userId : user._id} , process.env.ACCESS_TOKEN_SECRET ,{expiresIn : '15min'});
          const newSession = await Session.findByIdAndUpdate({
            userId: user._id,
            sessionToken: newSessionToken },{
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)}
            ,{new: true,});
            res.cookie("refreshToken" , refreshToken , {httpOnly : true});
    }catch(err){
      console.log(err);
    }
  }

  const userLogout = async (req , res)=>{
    const {userId} = req.body;
    await Session.deleteMany({userId})
    res.clearCookie('refreshToken');
    res.status(200).json({message: "Logged out successfully", success: true});
  }

export { postSignup, postLogin , refreshUserToken , userLogout };
