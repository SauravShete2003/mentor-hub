import { model, Schema } from "mongoose";

const userschema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.oauthProvider;
      },
      select: false,
    },
    oauthProvider: {
      type: String,
      enum: ["google", "facebook", "github", null],
      default: null,
    },
    oauthId: {
      type: String,
      unique: true,
      sparse: true,
    },
    profilePictures: {
      type: String,
      default: "default-picture.png",
    },
    bio: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    isVarified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "mentor"],
      default: "user",
    },
  },
  { timestamps: true }
);
const User = model("User", userschema);
export default User;
