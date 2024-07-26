import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;
export const createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, secret);
  return token;
};
export const validateToken = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};
