import User from "../models/user.model.js";
export const handleSignUp= async(req, res, next) => {
  const { fullname, email, password } = req.body;
  if (
    !fullname ||
    !email ||
    !password ||
    fullname === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All feilds are required" });
  }
  const newUser = new User({ fullname, email, password });
  await newUser.save();
}
