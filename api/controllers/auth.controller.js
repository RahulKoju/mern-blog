import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.utils.js";
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
  const newUser = new User({ fullname, email, password });
  try {
    await newUser.save();
    res.json("sign Up successfull");
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
    next(error);
  }
};
export const handleLoginFailure = (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login Failure",
  });
};
export const handleLoginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized",
    });
  }
};
export const handleLogout = (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
};
