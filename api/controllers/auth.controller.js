import Token from "../models/token.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.utils.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.utils.js";

export const handleSignUp = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  if (
    !fullname ||
    !email ||
    !password ||
    fullname === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All feilds are required."));
  }
  try {
    const newUser = new User({ fullname, email, password });
    await newUser.save();
    const token = new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await token.save();
    const url = `${process.env.CLIENT_URL}/verify-email/${token.token}`;
    const text = `<p>Click the link below to verify your email:</p>
        <a href="${url}">${url}</a>
        <p>If you didn't request this, please ignore this email.</p>`;
    await sendEmail(newUser.email, "Verify Email", text);
    res.status(200).send({
      message:
        "Sign Up successfull, please check your email to verify your account.",
    });
  } catch (error) {
    next(error);
  }
};

export const handleSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All feilds are required."));
  }
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    const validUser = await User.findOne({ email });
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("Access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    if (error.needsVerification) {
      // Generate a new verification token and send email if the user needs to verify their email
      let token = await Token.findOne({ userId: error.userId });
      if (!token) {
        token = await new Token({
          userId: error.user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      const url = `${process.env.CLIENT_URL}/verify-email/${token.token}`;
      const text = `<p>Click the link below to verify your email:</p>
        <a href="${url}">${url}</a>
        <p>If you didn't request this, please ignore this email.</p>`;
      await sendEmail(error.user.email, "Verify Email", text);
      return res.status(400).json({
        message:
          "Please verify your email before logging in. A verification email has been sent to your account.",
      });
    }

    next(error);
  }
};

export const handleSignOut = (req, res, next) => {
  try {
    res
      .clearCookie("Access_token")
      .status(200)
      .json({ message: "User has been signed out" });
  } catch (error) {
    next(error);
  }
};

export const handleForgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist." });
    }
    //we can also use jwt instead of creating a tokenschema and pass this token as a token for reseting the password
    //const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await token.save();
    }
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token.token}`;
    const text = `<p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn't request this, please ignore this email.</p>`;
    await sendEmail(user.email, "Password Reset", text);
    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    next(error);
  }
};

export const handleResetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    //And use jwt verification for verifying the token if it is valid or not
    //const payload = jwt.verify(token, secret);
    const resetToken = await Token.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const user = await User.findById(resetToken.userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found or Invalid Link" });
    }
    user.password = password;
    await user.save();
    await resetToken.deleteOne();
    res.status(200).json({ message: "Password has been reset." });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { token } = req.params;
  try {
    const foundToken = await Token.findOne({ token });
    if (!foundToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const user = await User.findById(foundToken.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.isVerified = true;
    await user.save();
    await foundToken.deleteOne();
    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    next(error);
  }
};
