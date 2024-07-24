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
    next(errorHandler(400, "All feilds are required"));
  }
  const newUser = new User({ fullname, email, password });
  try {
    await newUser.save();
    res.json("sign Up successfull");
  } catch (error) {
    next(error);
  }
};
