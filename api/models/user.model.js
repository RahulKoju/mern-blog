import mongoose from "mongoose";
import crypto from "crypto";
import { createToken } from "../services/auth.services.js";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      const error = new Error("User not found!!");
      error.statusCode = 404;
      throw error;
    }
    if (!user.isVerified) {
      // Throw an error to notify the user to verify their email.
      const error = new Error("Please verify your email before logging in.");
      error.statusCode = 400;
      error.needsVerification = true; // Custom property to indicate this error needs a verification email to be sent.
      error.user=user;
      throw error;
    }
    const salt = user.salt;
    const hashedPassword = user.password;
    const userHashedPassword = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (userHashedPassword !== hashedPassword) {
      const error = new Error("Incorrect Password!");
      error.statusCode = 401;
      throw error;
    }
    const token = createToken(user);
    return token;
  }
);
const User = mongoose.model("User", userSchema);
export default User;
