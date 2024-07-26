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
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = crypto.randomBytes(16).toString();
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
    if (!user) throw new Error("User not found!!");
    const salt = user.salt;
    const hashedPassword = user.password;
    const userHashedPassword = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (userHashedPassword !== hashedPassword) {
      throw new Error("Incorrect Password!");
    }
    const token = createToken(user);
    return token;
  }
);
const User = mongoose.model("User", userSchema);
export default User;
